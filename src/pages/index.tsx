import Header from "../components/Header";
import Hero from "../components/Hero";
import CourseDepartments from "../components/CourseDepartment";
import StudentDashboard from "../components/StudentDashboard";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CourseDepartments />
        <StudentDashboard />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-2">SATCOM TECHNOLOG</h3>
              <p className="text-sm text-muted-foreground">
                Leading technical training institute providing hands-on education in electronics, 
                computers, and industrial equipment maintenance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Quick Links</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Courses</div>
                <div>Student Portal</div>
                <div>Admissions</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Contact Info</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Piazza: 091 382 7979</div>
                <div>Megenagna: 091 3 87 70 70</div>
                <div>info@satcomtechnolog.com</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
            © 2024 SATCOM TECHNOLOG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;