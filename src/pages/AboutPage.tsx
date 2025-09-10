import { MapPin, Phone, Clock, CheckCircle, Users, Award, Star } from 'lucide-react';

export function AboutPage() {
  const features = [
    'Industry-certified instructors with real-world experience',
    'Modern, well-equipped laboratories and workshops',
    'Flexible scheduling for working professionals',
    'Job placement assistance and career guidance',
    'Hands-on training with latest technology',
    'Small class sizes for personalized attention'
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'Students Trained' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Star, value: '98%', label: 'Success Rate' },
    { icon: CheckCircle, value: '7', label: 'Departments' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SATCOM TECHNOLOG</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Leading technical education institute in Egypt, providing comprehensive training 
            in electronics, telecommunications, and advanced technology since 2008.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Established in 2008, SATCOM College is Ethiopia's premier institution for technical education, 
                  offering comprehensive programs in electronics, telecommunications, and modern technology fields. 
                  Located in the heart of Addis Ababa, we have empowered thousands of students to excel in diverse technical careers across Ethiopia and beyond.
                </p>
                
                <p>
                  What sets us apart is our commitment to hands-on learning. Every course combines 
                  theoretical foundations with extensive practical experience, preparing our graduates 
                  for immediate employment in their respective fields.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Technical Training Lab"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Student Learning"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
                />
                <img
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Electronics Workshop"
                  className="w-full h-48 object-cover rounded-lg shadow-lg -mt-8"
                />
                <img
                  src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Classroom"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
              <p className="text-blue-800 leading-relaxed">
                To provide world-class technical education that empowers students with practical 
                skills and knowledge needed to excel in today's rapidly evolving technological 
                landscape. We are committed to fostering innovation, creativity, and professional 
                excellence in all our graduates.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Our Vision</h3>
              <p className="text-green-800 leading-relaxed">
                To be the leading technical education institution, recognized 
                for our innovative teaching methods, industry partnerships, and the success of 
                our graduates. We envision a future where our alumni lead technological advancement 
                across various industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Campus</h2>
            <p className="text-xl text-gray-600">
              Come see our facilities and meet our experienced instructors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                Piassa <br />
                Megenagna
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                091382 7979<br />
                0913 87 70 70
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-600">
                Saturday - Thursday<br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}