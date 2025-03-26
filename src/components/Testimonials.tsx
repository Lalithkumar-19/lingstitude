import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content:
      "The specialized business English course at Lingstitude transformed my interview process. I was able to articulate my skills confidently and secured a position at a multinational company.",
    author: "Sarah Johnson",
    role: "Marketing Specialist at TechGlobal",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=60&crop=faces",
  },
  {
    content:
      "As someone who deals with international clients daily, the communication skills I gained from Lingstitude gave me the confidence to lead global meetings and negotiations effectively.",
    author: "Michael Chen",
    role: "Project Manager at InnovateCorp",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=60&crop=faces",
  },
  {
    content:
      "The personalized coaching approach made all the difference. My instructor focused specifically on presentation skills for my industry, which helped me secure a promotion within months.",
    author: "Emily Rodriguez",
    role: "Senior Financial Analyst at Capital Group",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&auto=format&fit=crop&q=60&crop=faces",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-brand-50"
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-64 w-[600px] h-[600px] rounded-full bg-brand-100/50 blur-3xl -z-10"
        aria-hidden="true"
      ></div>

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-brand-100 bg-opacity-70 backdrop-blur-sm rounded-full px-3 py-1 border border-brand-200 mb-4">
            <span className="text-xs font-medium text-brand-700">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Graduates Say
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Hear from professionals who transformed their careers through our
            specialized English training programs.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl glass-effect shadow-lg border border-white/30 p-2 md:p-3 animate-fade-up">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="min-w-full p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="flex-shrink-0 md:w-1/3">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0">
                        <div className="absolute -top-4 -left-4 text-brand-300">
                          <Quote size={48} />
                        </div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-lg md:text-xl text-foreground mb-6 text-balance">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full bg-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full bg-white"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    idx === activeIndex ? "bg-brand-600" : "bg-brand-200"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              number: "95%",
              text: "of our students report career advancement within 6 months",
            },
            {
              number: "20+",
              text: "industry-specific English programs for different career paths",
            },
            {
              number: "4.8/5",
              text: "average student satisfaction rating from our graduates",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-sm border border-border text-center animate-fade-up"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
