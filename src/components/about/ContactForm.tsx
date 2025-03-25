import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Construct the WhatsApp URL
        const whatsappNumber = '9492022599'; // Replace with your WhatsApp number
        const text = `Hello, my name is ${name}.\nMy email is ${email}.\nHere's my message: ${message}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');

        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your Message..."
                rows={4}
                />
            </div>
            <Button type="submit" className="w-full">Send via WhatsApp</Button>
            </form>
        </motion.div>
        </div>
    );
};

export default ContactForm;
