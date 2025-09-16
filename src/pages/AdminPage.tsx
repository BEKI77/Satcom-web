import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/lib';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'users' | 'settings'>('overview');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  // Course edit/create modal state
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  // Admin creation modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase
      .from('courses')
      .select('*')
      .then(({ data, error }) => {
        if (!error) setCourses(data || []);
        setLoading(false);
      });
  }, []);

   // Fetch users
  useEffect(() => {
    setUsersLoading(true);
    supabase
      .from('profiles')
      .select('*')
      .then(({ data, error }) => {
        if (!error) setUsers(data || []);
        setUsersLoading(false);
      });
  }, []);

  // Course CRUD handlers
  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) {
      setCourses(courses.filter((c) => c.id !== id));
      toast.success('Course deleted');
    } else {
      toast.error('Failed to delete course');
    }
  };

  const handleSaveCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const courseData = Object.fromEntries(formData.entries());

    if (editingCourse) {
      // Update
      const { error, data } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', editingCourse.id)
        .select();
      if (!error) {
        setCourses((prev) =>
          prev.map((c) => (c.id === editingCourse.id ? { ...c, ...courseData } : c))
        );
        toast.success('Course updated');
      } else {
        toast.error('Failed to update course');
      }
    } else {
      // Create
      const { error, data } = await supabase
        .from('courses')
        .insert([courseData])
        .select();
      if (!error && data) {
        setCourses((prev) => [...prev, data[0]]);
        toast.success('Course created');
      } else {
        toast.error('Failed to create course');
      }
    }
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleCreateAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdminLoading(true);
    // Sign up new user
    const { data, error } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: { name: adminName, role: 'Admin' },
      },
    });

    // update this function!!

    if (!error) {
      toast.success('Admin account created');
      setShowAdminModal(false);
      setAdminEmail('');
      setAdminPassword('');
      setAdminName('');
      // Optionally, refresh users list
      const { data: usersData } = await supabase.from('profiles').select('*');
      setUsers(usersData || []);
    } else {
      toast.error(error.message || 'Failed to create admin');
    }
    setAdminLoading(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">2,847</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+2 new courses</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+5% improvement</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$52,400</p>
            </div>
            <Settings className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+8% this quarter</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New student enrolled', course: 'Cell Phone Repair Fundamentals', time: '2 hours ago' },
            { action: 'Course completed', course: 'Network Administration Basics', time: '4 hours ago' },
            { action: 'New course created', course: 'Advanced Electrical Systems', time: '1 day ago' },
            { action: 'Student feedback received', course: 'Computer Hardware Repair', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.course}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
   <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => {
            setEditingCourse(null);
            setShowCourseModal(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover" src={course.thumbnail} alt={course.title} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">${course.price}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.departmentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.floor(Math.random() * 100) + 20} enrolled
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => handleEditCourse(course)}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteCourse(course.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <form
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-4"
            onSubmit={handleSaveCourse}
          >
            <h2 className="text-xl font-bold mb-4">{editingCourse ? 'Edit Course' : 'Add Course'}</h2>
            <input
              name="title"
              defaultValue={editingCourse?.title || ''}
              placeholder="Title"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              name="thumbnail"
              defaultValue={editingCourse?.thumbnail || ''}
              placeholder="Thumbnail URL"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              name="departmentId"
              defaultValue={editingCourse?.departmentId || ''}
              placeholder="Department ID"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              name="instructor"
              defaultValue={editingCourse?.instructor || ''}
              placeholder="Instructor"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              name="price"
              type="number"
              defaultValue={editingCourse?.price || ''}
              placeholder="Price"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              name="description"
              defaultValue={editingCourse?.description || ''}
              placeholder="Description"
              required
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  setShowCourseModal(false);
                  setEditingCourse(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => setShowAdminModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Admin</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {usersLoading ? (
          <div>Loading users...</div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : user.email[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name || user.email}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'Instructor' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role || 'Student'}
                  </span>
                  <span className="text-sm text-gray-500">{user.created_at?.slice(0, 10)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <form
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-4"
            onSubmit={handleCreateAdmin}
          >
            <h2 className="text-xl font-bold mb-4">Create Admin Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={adminName}
              onChange={e => setAdminName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowAdminModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={adminLoading}
              >
                {adminLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">General Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="SATCOM TECHNOLOG"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="info@satcomtechnolog.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="091382 7979"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Course Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-enroll new students</p>
                <p className="text-sm text-gray-500">Automatically enroll students in introductory courses</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email notifications</p>
                <p className="text-sm text-gray-500">Send email updates to students</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Backup & Security</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Backup Data
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Export Reports
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            Security Audit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage your learning platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon
                    className={`mr-2 h-5 w-5 ${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'courses' && renderCourses()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}