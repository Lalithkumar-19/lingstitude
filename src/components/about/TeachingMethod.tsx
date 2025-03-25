import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, MessageSquare, Target } from "lucide-react";
import React from "react";

interface Method {
    icon: JSX.Element;
    title: string;
    description: string;
}

const TeachingMethod: React.FC = () => {
    const methods: Method[] = [
        {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Structured Learning Path",
        description: "Progressive curriculum designed to build strong foundations",
        },
        {
        icon: <Users className="w-8 h-8" />,
        title: "Interactive Sessions",
        description: "Engaging group discussions and peer learning opportunities",
        },
        {
        icon: <MessageSquare className="w-8 h-8 " />,
        title: "Real-world Practice",
        description: "Practical exercises based on real-life scenarios",
        },
        {
        icon: <Target className="w-8 h-8" color="blue" />,
        title: "Personalized Feedback",
        description: "Regular assessments and individualized guidance",
        },
    ];

    return (
        <section className="py-20">
        <div className="container px-4">
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-blue-100"
            >
            Our Method of Teaching
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methods.map((method, index) => (
                <motion.div
                key={method.title}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                }}
                viewport={{ once: true }}
                >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="text-blue-600 mb-4 flex justify-center">{method.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-gray-600">{method.description}</p>
                </Card>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default TeachingMethod;
