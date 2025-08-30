import { MapPin, Phone, CheckCircle } from 'lucide-react';

export function About() {
  const features = [
    'Industry-certified instructors with real-world experience',
    'Modern, well-equipped laboratories and workshops',
    'Flexible scheduling for working professionals',
    'Job placement assistance and career guidance',
    'Hands-on training with latest technology',
    'Small class sizes for personalized attention'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About SATCOM College
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Established in 2008, SATCOM College is Ethiopia's premier institution for technical education, 
              offering comprehensive programs in electronics, telecommunications, and modern technology fields. 
              Located in the heart of Addis Ababa, we have empowered thousands of students to excel in diverse technical careers across Ethiopia and beyond.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-sm">Megenagna, Addis Ababa</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Contact</p>
                  <p className="text-sm">+251 91 234 5678</p>
                </div>
              </div>
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
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}