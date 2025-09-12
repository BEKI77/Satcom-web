import { Star } from "lucide-react"

export function ChalkboardLearningCard() {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="bg-card chalkboard-texture rounded-xl shadow-2xl p-8 transform  hover:rotate-0 transition-all duration-500 hover:scale-105 chalk-border">
        {/* Chalk dust effect overlay */}
        <div className="absolute inset-0 rounded-xl opacity-20 pointer-events-none">
          <div className="absolute top-4 left-6 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
          <div className="absolute top-12 right-8 w-1 h-1 bg-white/20 rounded-full blur-sm"></div>
          <div className="absolute bottom-16 left-12 w-1.5 h-1.5 bg-white/25 rounded-full blur-sm"></div>
          <div className="absolute bottom-8 right-6 w-1 h-1 bg-white/15 rounded-full blur-sm"></div>
        </div>

        {/* Image with chalk frame effect */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-primary/20 rounded-lg transform "></div>
          <img
            src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Technical Training"
            className="relative w-full h-64 object-cover rounded-lg border-2 border-primary/60 shadow-lg"
          />
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary"></div>
        </div>

        <div className="space-y-4">
          {/* Title with chalk effect */}
          <h3 className="text-2xl font-bold text-card-foreground chalk-text font-sans tracking-wide">
            Hands-On Learning
          </h3>

          {/* Description with chalk styling */}
          <p className="text-muted-foreground chalk-text leading-relaxed">
            State-of-the-art labs with real equipment for practical experience
          </p>

          {/* Decorative chalk line */}
          <div className="flex items-center space-x-2 my-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
            <div className="w-2 h-2 bg-primary/80 rounded-full"></div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
          </div>

          {/* Star rating with chalk effect */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-primary text-primary drop-shadow-sm transform hover:scale-110 transition-transform"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground chalk-text ml-2 font-medium">Excellent Training</span>
          </div>

          {/* Chalk-style button */}
          <button className="mt-6 w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-primary/20 chalk-text">
            Learn More
          </button>
        </div>

        {/* Corner chalk marks */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary/40 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary/40 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-lg"></div>
      </div>
    </div>
  )
}
