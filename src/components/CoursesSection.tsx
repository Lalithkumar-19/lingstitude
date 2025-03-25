
import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import aeasy from '/public/course.jpg'
import abc from '/public/grammer.jpg'
import usa from '/public/studymaterials.jpg'
import dfd from '/public/vocabulary.jpg'
import qqq from '/public/practiceque.jpg'
import dsds from '/public/linkedin.jpg'
import deb from '/public/debate.jpg'
import dis from '/public/discussion.jpg'
import busi from '/public/businesscommunication.jpg'
import pre from '/public/presentationskills.jpg'
import inter from '/public/interactiveskills.jpg'
import micro from '/public/microsoft.jpg'
import ai from '/public/aitools.jpg'
import interactive from '/public/interactivegames.jpg'
import etique from '/public/etiquettes.jpg'

// Defining the types for feature cards
interface Feature {
    title: string
    description: string
    image: StaticImageData | string
    color?: string
    }

    const languageFeatures: Feature[] = [
    { title: "Course Validity", description: "Enroll in courses with flexible timelines...", image: aeasy, color: "from-blue-500/20 to-purple-500/20" },
    { title: "Complete Grammar Classes", description: "Master English grammar...", image: abc, color: "from-yellow-500/20 to-orange-500/20" },
    { title: "Study Material", description: "Access study materials, including worksheets...", image: usa, color: "from-emerald-500/20 to-teal-500/20" },
    { title: "Vocabulary Builder", description: "Expand your vocabulary with quizzes...", image: dfd, color: "from-pink-500/20 to-rose-500/20" },
    { title: "Practice Questions", description: "Enhance your skills through practice questions...", image: qqq, color: "from-violet-500/20 to-indigo-500/20" },
    { title: "LinkedIn Learning", description: "Optimize your LinkedIn profile...", image: dsds, color: "from-violet-500/20 to-indigo-500/20" }
    ]

    const softSkills: Feature[] = [
    { title: "Debate", description: "Participate in debates to improve communication...", image: deb, color: "from-cyan-500/20 to-purple-500/20" },
    { title: "Discussion", description: "Engage in discussions to express ideas clearly...", image: dis, color: "from-green-500/20 to-purple-500/20" },
    { title: "Business Communication", description: "Learn professional communication skills...", image: busi, color: "from-pink-500/20 to-purple-500/20" },
    { title: "Presentation Skills", description: "Master impactful presentations...", image: pre, color: "from-violet-500/20 to-purple-500/20" },
    { title: "Interactive Skills", description: "Develop interpersonal skills...", image: inter, color: "from-violet-500/20 to-blue-500/20" },
    { title: "Learn Microsoft Tools", description: "Gain proficiency in essential MS Office tools...", image: micro, color: "from-indigo-400/20 to-purple-500/20" },
    { title: "AI Tools to Boost Productivity", description: "Leverage AI tools to enhance productivity...", image: ai, color: "from-sky-500/20 to-purple-500/20" },
    { title: "Interactive Games to Build Networking", description: "Enhance networking skills through games...", image: interactive, color: "from-red-500/20 to-purple-500/20" },
    { title: "Etiquettes", description: "Master professional etiquette for networking...", image: etique, color: "from-violet-500/20 to-purple-500/20" }
    ]

    function FeatureCard({ title, description, image, color, index }: Feature & { index: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
        <Card className="group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${color || 'from-blue-500/20 to-blue-700/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative p-6 space-y-4">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <img src={image} alt={title} fill className="transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground/90 group-hover:text-foreground transition-colors duration-300">{title}</h3>
            <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
            </div>
        </Card>
        </motion.div>
    )
    }

    export function CoursesSection() {
    return (
        <section className="py-20 bg-gray-50">
        <div className="container px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Explore Our English Language and Skill Development Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Join us and take advantage of our resources for language learning and soft skills training.</p>
            </motion.div>

            {/* Language Features */}
            <div className="space-y-16">
            <div>
                <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className="text-3xl font-bold mb-8 text-indigo-800">
                Language Learning Features
                </motion.h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{languageFeatures.map((feature, index) => <FeatureCard key={feature.title} {...feature} index={index} />)}</div>
            </div>

            {/* Soft Skills Features */}
            <div>
                <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className="text-3xl font-bold mb-8 text-indigo-800">
                Soft Skills for Interviews and Career Growth
                </motion.h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{softSkills.map((skill, index) => <FeatureCard key={skill.title} {...skill} index={index} />)}</div>
            </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className="mt-16 text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-700 text-white">
                <a href="https://wa.me/+9492022599" target="_blank" rel="noopener noreferrer">Enroll Now</a>
            </Button>
            </motion.div>
        </div>
        </section>
    )
}
