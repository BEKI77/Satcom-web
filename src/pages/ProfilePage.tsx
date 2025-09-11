import  { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import { useProfile } from '@/context/profile- context';

export function ProfilePage() {
  const { profile: user } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.userName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    bio: ''
  });

  if (!user) return null;

  const handleSave = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  {user.avatar ?  
                   <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="h-24 w-24 rounded-full object-cover"
                  />:
                  <User className="h-12 w-12 text-blue-600" />
                  }
                 
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">{user.userName}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                    user.role === 'admin' ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    {user.role === 'admin' ? 'Administrator' : 'Student'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{user.userName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{formData.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{formData.address || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Account Statistics */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Statistics</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900">Enrolled Courses</h3>
                    {/* <p className="text-2xl font-bold text-blue-600">{user.enrolledCourses.length}</p> */}
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900">Completed Courses</h3>
                    <p className="text-2xl font-bold text-green-600">{user.completedCourses?.length}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-900">Account Type</h3>
                    <p className="text-lg font-semibold text-orange-600 capitalize">{user.role}</p>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bio</h3>
                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        {formData.bio || 'No bio provided yet. Click edit to add your bio.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}