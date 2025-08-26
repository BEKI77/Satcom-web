import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Get in <span className="bg-gradient-accent bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your technical career? Contact us today for enrollment and course information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Address</div>
                    <div className="text-sm text-muted-foreground">
                      Piazza (091 382 7979) / Megenagna (091 3 87 70 70) / Torhayloch
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-tech-green/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-tech-green" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone Numbers</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Piazza: 091 382 7979</div>
                      <div>Megenagna: 091 3 87 70 70</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-tech-blue/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-tech-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">
                      info@satcomtechnolog.com
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-tech-orange/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-tech-orange" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Operating Hours</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                      <div>Saturday: 9:00 AM - 3:00 PM</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Enrollment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Quick Enrollment</CardTitle>
                <CardDescription>
                  Ready to enroll? Choose your department and get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Computer Maintenance & Networking
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Cell Phone & Smart Phone Repair
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Building Electrical Installation
                  </Button>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    View All Departments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name
                      </label>
                      <Input placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number
                      </label>
                      <Input placeholder="Enter your phone number" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Department of Interest
                    </label>
                    <Input placeholder="Which department are you interested in?" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your learning goals and any questions you have..." 
                      rows={5}
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Our Locations</CardTitle>
              <CardDescription>
                Visit us at any of our three convenient locations in Addis Ababa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Interactive Map</div>
                  <div className="text-sm">Map integration would be implemented here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;