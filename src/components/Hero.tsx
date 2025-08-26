import { Button } from "../components/ui/button";
import { ArrowRight, Play, Users, Award, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Master <span className="bg-gradient-primary bg-clip-text text-transparent">Technical Skills</span> for Tomorrow
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join SATCOM TECHNOLOG for comprehensive technical training in electronics, computers, 
                and industrial equipment. Get hands-on experience with industry-standard equipment.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-tech-blue/20 rounded-lg mb-2 mx-auto">
                  <Users className="w-6 h-6 text-tech-blue" />
                </div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-tech-green/20 rounded-lg mb-2 mx-auto">
                  <Award className="w-6 h-6 text-tech-green" />
                </div>
                <div className="text-2xl font-bold text-foreground">7</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-tech-orange/20 rounded-lg mb-2 mx-auto">
                  <Clock className="w-6 h-6 text-tech-orange" />
                </div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-secondary rounded-2xl p-8 shadow-elevated">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-tech-orange/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-tech-blue/20 rounded-full blur-xl"></div>
              <div className="relative bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Student Dashboard Preview</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm text-foreground">Computer Maintenance</span>
                    <div className="w-16 h-2 bg-tech-green rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm text-foreground">Cell Phone Repair</span>
                    <div className="w-12 h-2 bg-tech-blue rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm text-foreground">Electrical Installation</span>
                    <div className="w-8 h-2 bg-tech-orange rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;