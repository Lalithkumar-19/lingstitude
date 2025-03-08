
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pb-20 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white -z-10"></div>
      <div 
        className="absolute top-0 -right-64 w-[800px] h-[800px] rounded-full bg-brand-100/50 blur-3xl -z-10"
        aria-hidden="true"
      ></div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up [animation-delay:200ms]">
            <div className="inline-flex items-center space-x-2 bg-brand-100 bg-opacity-70 backdrop-blur-sm rounded-full px-3 py-1 border border-brand-200 mb-6">
              <span className="text-xs font-medium text-brand-700">Career-Focused English Training</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Elevate Your <span className="text-brand-600">Career</span> With Professional English
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg text-balance">
              Specialized English communication training for graduates and professionals to accelerate your career path and stand out in the job market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium">
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="font-medium">
                Learn More
              </Button>
            </div>
            <div className="mt-8 flex items-center text-sm text-muted-foreground">
              <div className="flex -space-x-2 mr-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=60&crop=faces" 
                  alt="Student 1" 
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=60&crop=faces" 
                  alt="Student 2" 
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop&q=60&crop=faces" 
                  alt="Student 3" 
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              </div>
              <span>Join over <span className="font-medium text-foreground">2,000+ students</span> worldwide</span>
            </div>
          </div>
          
          <div className="relative animate-fade-up [animation-delay:400ms]">
            <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                alt="Student learning English"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <span className="px-2 py-1 bg-brand-600 text-white text-xs font-medium rounded">FEATURED</span>
                  <h3 className="text-xl font-semibold mt-2">Business English Communication</h3>
                  <p className="text-sm text-white/80">Master professional communication skills</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center p-2 saturate-hover">
              <div className="text-center">
                <span className="block text-xs text-brand-600 font-medium">Starting at</span>
                <span className="text-xl font-bold">$199</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
