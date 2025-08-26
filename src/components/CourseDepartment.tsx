import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  Volume2, 
  Zap, 
  Home, 
  Cog,
  ArrowRight,
  Clock,
  Users
} from "lucide-react";

const departments = [
  {
    id: 1,
    title: "Cell Phone & Smart Phones Maintenance",
    icon: Smartphone,
    color: "tech-blue",
    duration: "3 months",
    students: 85,
    description: "Master cell phone hardware and software maintenance",
    courses: [
      "Repairing Cell Phones & Smart Phones",
      "Hardware Maintenance", 
      "Software Maintenance (Unlocking & Flashing)",
      "Installing & uninstalling applications"
    ]
  },
  {
    id: 2,
    title: "Office Machines Maintenance",
    icon: Monitor,
    color: "tech-green",
    duration: "4 months",
    students: 67,
    description: "Comprehensive office equipment repair and maintenance",
    courses: [
      "Digital (IR) Photocopiers",
      "Printers Maintenance",
      "LCD Projector, Scanners & Multi-functional Printers",
      "Advanced Computer Hardware Maintenance"
    ]
  },
  {
    id: 3,
    title: "Computer Maintenance & Networking",
    icon: Wifi,
    color: "tech-purple",
    duration: "5 months",
    students: 92,
    description: "Advanced computer systems and network administration",
    courses: [
      "Server Based Networking (Client-server networking)",
      "Laptop & LCD Monitors Maintenance",
      "Computer Power Supply Maintenance",
      "Windows Troubleshooting"
    ]
  },
  {
    id: 4,
    title: "Audio Video Equipment's Maintenance",
    icon: Volume2,
    color: "tech-orange",
    duration: "3 months",
    students: 54,
    description: "Audio-visual equipment repair and maintenance",
    courses: [
      "CRT & LED TV Receivers Maintenance",
      "GEEPAS Amplifiers Maintenance",
      "Satellite Receiver (Decoder) Maintenance",
      "Basic Electronics"
    ]
  },
  {
    id: 5,
    title: "Building Electrical Installation",
    icon: Zap,
    color: "tech-blue",
    duration: "4 months",
    students: 73,
    description: "Professional electrical installation and design",
    courses: [
      "Designing Building Electrical Installation",
      "Lab Works (Practical Installation)",
      "Floor Plan Reading/Inter Preting & Cost Estimation"
    ]
  },
  {
    id: 6,
    title: "Refrigerator & House hold Appliances",
    icon: Home,
    color: "tech-green",
    duration: "3 months",
    students: 61,
    description: "Home appliance repair and maintenance",
    courses: [
      "Refrigerator Maintenance",
      "Washing Machines Repair",
      "Micro Wave Oven & Stove",
      "Charging and Discharging Refrigerant Gas"
    ]
  },
  {
    id: 7,
    title: "Industrial Equipment's Maintenance",
    icon: Cog,
    color: "tech-purple",
    duration: "6 months",
    students: 38,
    description: "Heavy duty industrial equipment maintenance",
    courses: [
      "Electric Motor & Motor Driving (Control)",
      "Industrial Installation",
      "Motor Rewinding"
    ]
  }
];

const getColorClasses = (color: string) => {
  const colorMap = {
    'tech-blue': 'from-tech-blue/20 to-tech-blue/5 border-tech-blue/20',
    'tech-green': 'from-tech-green/20 to-tech-green/5 border-tech-green/20',
    'tech-purple': 'from-tech-purple/20 to-tech-purple/5 border-tech-purple/20',
    'tech-orange': 'from-tech-orange/20 to-tech-orange/5 border-tech-orange/20'
  };
  return colorMap[color as keyof typeof colorMap] || colorMap['tech-blue'];
};

const getIconColorClass = (color: string) => {
  const colorMap = {
    'tech-blue': 'text-tech-blue',
    'tech-green': 'text-tech-green',
    'tech-purple': 'text-tech-purple',
    'tech-orange': 'text-tech-orange'
  };
  return colorMap[color as keyof typeof colorMap] || colorMap['tech-blue'];
};

const CourseDepartments = () => {
  return (
    <section id="courses" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Departments</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive technical training programs designed to meet industry standards
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <Card 
                key={dept.id} 
                className={`group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${getColorClasses(dept.color)} border`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm">
                      <IconComponent className={`w-6 h-6 ${getIconColorClass(dept.color)}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Dept {dept.id}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {dept.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {dept.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {dept.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {dept.students} students
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm">Course Highlights:</h4>
                    <ul className="space-y-1">
                      {dept.courses.slice(0, 2).map((course, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {course}
                        </li>
                      ))}
                      {dept.courses.length > 2 && (
                        <li className="text-xs text-muted-foreground">
                          +{dept.courses.length - 2} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-background/80 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseDepartments;