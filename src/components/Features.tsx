
import { Check, Globe, Headphones, Award, BookOpen, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-brand-600" />,
      title: "Specialized Curriculum",
      description: "Courses designed specifically for career advancement and professional contexts.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-brand-600" />,
      title: "Personalized Coaching",
      description: "One-on-one sessions with expert language coaches focused on your career goals.",
    },
    {
      icon: <Globe className="h-6 w-6 text-brand-600" />,
      title: "Global Certification",
      description: "Internationally recognized certificates to boost your resume.",
    },
    {
      icon: <Users className="h-6 w-6 text-brand-600" />,
      title: "Networking Opportunities",
      description: "Connect with professionals from diverse industries worldwide.",
    },
    {
      icon: <Award className="h-6 w-6 text-brand-600" />,
      title: "Industry Recognition",
      description: "Programs endorsed by leading corporations and organizations.",
    },
  ];

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-brand-100 bg-opacity-70 backdrop-blur-sm rounded-full px-3 py-1 border border-brand-200 mb-4">
            <span className="text-xs font-medium text-brand-700">Our Advantage</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Lingstitute
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Our English training programs are specifically designed for career-minded individuals looking to gain a competitive edge in the global job market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-50 rounded-2xl p-8 md:p-10 lg:p-12 animate-fade-up [animation-delay:600ms]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Our Course Methodology
              </h3>
              <p className="text-muted-foreground mb-6">
                We follow a proven 4-step methodology that ensures rapid progress and practical skill development for real-world application.
              </p>
              <ul className="space-y-3">
                {[
                  "Focused assessment of language skills and career goals",
                  "Customized learning path tailored to your industry",
                  "Intensive practice with real-world business scenarios",
                  "Ongoing evaluation and career-specific feedback"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-brand-600 flex-shrink-0 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200" 
                alt="Professional team working together" 
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
