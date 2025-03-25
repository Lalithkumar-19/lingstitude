import { CoursesSection } from '@/components/CoursesSection'
import React from 'react'

const Courses: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white dark:bg-gray-900">
        
        <main className="flex-1">
            <CoursesSection />
        </main>
        
        </div>
    )
}

export default Courses
