import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  Award, 
  TrendingUp,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText
} from "lucide-react";

const StudentDashboard = () => {
  const studentData = {
    name: "Ahmed Hassan",
    id: "ST2024001",
    department: "Computer Maintenance & Networking",
    enrolledDate: "Jan 15, 2024",
    completedCourses: 3,
    totalCourses: 8,
    overallProgress: 65,
    currentGrade: "B+"
  };

  const currentCourses = [
    {
      title: "Server Based Networking",
      progress: 85,
      status: "In Progress",
      nextClass: "Tomorrow 10:00 AM",
      instructor: "Eng. Mohamed Ali"
    },
    {
      title: "Windows Troubleshooting", 
      progress: 45,
      status: "Active",
      nextClass: "Friday 2:00 PM",
      instructor: "Eng. Sara Ahmed"
    },
    {
      title: "Computer Power Supply",
      progress: 20,
      status: "Starting Soon",
      nextClass: "Next Week",
      instructor: "Eng. Omar Hassan"
    }
  ];

  const recentAchievements = [
    { title: "Hardware Basics Completed", date: "2 days ago", type: "completion" },
    { title: "Networking Quiz - 95%", date: "1 week ago", type: "achievement" },
    { title: "Practical Lab Excellence", date: "2 weeks ago", type: "award" }
  ];

  const upcomingSchedule = [
    { course: "Server Networking Lab", time: "10:00 AM", room: "Lab 2", type: "practical" },
    { course: "Troubleshooting Theory", time: "2:00 PM", room: "Room 5", type: "theory" },
    { course: "Assessment Test", time: "4:00 PM", room: "Room 1", type: "exam" }
  ];

  return (
    <section id="dashboard" className="py-16 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Student <span className="bg-gradient-secondary bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress, manage courses, and stay connected with your learning journey
          </p>
        </div>

        {/* Student Profile Card */}
        <div className="mb-8">
          <Card className="bg-gradient-primary text-white border-none shadow-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">{studentData.name}</CardTitle>
                  <CardDescription className="text-white/80">
                    Student ID: {studentData.id}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    {studentData.currentGrade}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <div className="text-white/80 text-sm">Department</div>
                  <div className="font-semibold text-white">{studentData.department}</div>
                </div>
                <div>
                  <div className="text-white/80 text-sm">Enrolled Since</div>
                  <div className="font-semibold text-white">{studentData.enrolledDate}</div>
                </div>
                <div>
                  <div className="text-white/80 text-sm">Courses Completed</div>
                  <div className="font-semibold text-white">{studentData.completedCourses}/{studentData.totalCourses}</div>
                </div>
                <div>
                  <div className="text-white/80 text-sm">Overall Progress</div>
                  <div className="font-semibold text-white">{studentData.overallProgress}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Courses */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Current Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCourses.map((course, idx) => (
                  <div key={idx} className="p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                      <Badge 
                        variant={course.status === 'In Progress' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {course.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        Next: {course.nextClass}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingSchedule.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          item.type === 'practical' ? 'bg-tech-green' :
                          item.type === 'theory' ? 'bg-tech-blue' : 'bg-tech-orange'
                        }`}></div>
                        <div>
                          <div className="font-medium text-foreground">{item.course}</div>
                          <div className="text-sm text-muted-foreground">{item.room}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-foreground">{item.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{studentData.overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <Progress value={studentData.overallProgress} className="h-3" />
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{studentData.completedCourses}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{studentData.totalCourses - studentData.completedCourses}</div>
                    <div className="text-xs text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.type === 'completion' ? 'bg-tech-green/20' :
                        achievement.type === 'achievement' ? 'bg-tech-blue/20' : 'bg-tech-orange/20'
                      }`}>
                        {achievement.type === 'completion' ? (
                          <CheckCircle className="w-4 h-4 text-tech-green" />
                        ) : achievement.type === 'achievement' ? (
                          <TrendingUp className="w-4 h-4 text-tech-blue" />
                        ) : (
                          <Award className="w-4 h-4 text-tech-orange" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View Assignments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;