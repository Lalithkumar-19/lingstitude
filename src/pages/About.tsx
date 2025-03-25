
import  MissionSection  from "@/components/about/MissionSection";
import  WhyChooseUs  from "@/components/about/WhyChooseUs";
import  TeachingMethod  from "@/components/about/TeachingMethod";
import  ContactForm  from "@/components/about/ContactForm";

const About: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-blue-100">
        

        <main className="flex-1">
            <MissionSection />
            <WhyChooseUs />
            <TeachingMethod />
            <section className="py-20 bg-blue-100">
            <div className="container px-4">
                <h2 className="text-4xl font-bold text-center mb-16">Contact Us</h2>
                <ContactForm />
            </div>
            </section>
        </main>

        
        </div>
    );
};

export default About;
