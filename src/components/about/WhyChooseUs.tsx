import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard  from './AnimatedCard';

// Image Imports (Make sure your project setup can handle these imports properly)
import anyImage from '/public/anytimeimage.jpg';
import expertImage from '/public/expertinstructors.jpg';
import globalImage from '/public/globalcommunity.jpg';

const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-20">
        <div className="container px-4">
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            >
            <h2 className="text-4xl font-bold text-center mb-16">
                Why Learn With Us
            </h2>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard
                title="Learn Anytime, Anywhere"
                description="With our flexible online courses, you can learn English at your own pace, from anywhere in the world."
                imageSrc={anyImage}
                imageAlt="Online learning illustration"
                delay={0.2}
            />
            <AnimatedCard
                title="Expert Instructors"
                description="Our instructors are experienced, certified, and passionate about teaching English to learners of all levels."
                imageSrc={expertImage}
                imageAlt="Expert instructors teaching"
                delay={0.2}
            />
            <AnimatedCard
                title="Join a Global Community"
                description="Connect with thousands of learners from different parts of the world. Share experiences and improve together."
                imageSrc={globalImage}
                imageAlt="Global community of learners"
                delay={0.2}
            />
            </div>
        </div>
        </section>
    );
};

export default WhyChooseUs;
