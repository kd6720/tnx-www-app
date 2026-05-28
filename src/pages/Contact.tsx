import React, {useState} from 'react';
import {Mail, MapPin, Phone} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        company: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailBody = `
Dear TrustedNetworx Team,

A new contact form submission has been received from ${formData.name} at ${formData.company}:
${formData.message}

Contact Information:
------------------
Name: ${formData.name}
${formData.title ? `Title: ${formData.title}` : ''}
Company: ${formData.company}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}


Best regards,
${formData.name}
${formData.company}
    `.trim().replace(/\n/g, '%0D%0A');

        window.location.href = `mailto:carter@trustednetworx.com?subject=New Contact Form Submission from ${formData.name} - ${formData.company}&body=${emailBody}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative min-h-[400px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/Circuit-Board.jpg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/50"/>
                </div>

                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-blue-200 sm:text-5xl md:text-6xl">
                                Contact Us
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Get in touch with our team to discuss your business needs
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Get In Touch</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company
                                    *</label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email
                                    *</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your
                                    Message *</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    required
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center text-gray-700">
                                <Phone className="h-6 w-6 text-blue-600 mr-3"/>
                                <span>305-498-7530</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Mail className="h-6 w-6 text-blue-600 mr-3"/>
                                <span>carter@trustednetworx.com</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="h-6 w-6 text-blue-600 mr-3"/>
                                <span>18001 Old Cutler Rd, Miami, FL 33157</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About Us</h3>
                            <p className="text-gray-600">
                                TrustedNetworx is your partner in telecommunications solutions. We specialize in
                                providing cutting-edge technology solutions that help businesses stay connected,
                                efficient, and competitive in today's digital world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;