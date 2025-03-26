import React from "react";
import { motion } from "framer-motion";

const MissionSection: React.FC = () => {
  return (
    <section className="py-20 dark:bg-emerald-900/20">
      <div className="container px-4 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-600 leading-relaxed">
            At Lingstitute, our mission is to help learners worldwide gain the
            confidence and skills to communicate effectively in English. We
            believe that learning English should be accessible, engaging, and
            empowering for all. Through our innovative teaching methods and
            supportive community, we're making quality language education
            available to everyone.
          </p>
        </motion.p>
      </div>
    </section>
  );
};

export default MissionSection;
