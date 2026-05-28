import React from 'react';
import { Link } from 'react-router-dom';
import {
    Phone,
    Bot,
    Wifi,
    PhoneCall,
    Smartphone,
    Mic,
    ArrowRight,
    Users,
    Zap,
    Shield,
    Handshake
} from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative min-h-[600px] flex items-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/TrustedNetworx-Hero-Image.jpg)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/50" />
                </div>

                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <p className="text-base text-blue-200 sm:text-lg md:text-xl">
                                    TRUSTEDNETWORX
                                </p>
                                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl mt-2">
                                    <span className="block">Modern Solutions for</span>
                                    <span className="block text-blue-200">Modern Business</span>
                                </h1>
                                <div className="flex justify-center">
                                    <h2 className="mt-3 text-base text-white sm:text-lg md:text-xl max-w-xl">
                                        TrustedNetworx Managed Solution Provider
                                    </h2>
                                </div>
                                <div className="mt-8">
                                    <Link to="/contact"
                                          className="inline-flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent">
                    </div>
                    <div className="absolute shadow-xl w-1/2 h-[1000px] bg-blue-100 -skew-x-12 -left-1/4"></div>
                    <div className="absolute shadow-xl w-1/2 h-full bg-blue-100 skew-x-12 -right-1/4 top-1/4"></div>
                </div>

                {/* Services Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        <div className="glass-morphism rounded-2xl p-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Managed Services
                                </h2>
                                <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
                                    Comprehensive telecommunications solutions for your business needs
                                </p>
                            </div>

                            <div className="mt-10">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    <Link to="/pots-replacement" className="group h-full">
                                        <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-shadow text-center h-full flex flex-col">
                                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-4">
                                                <Phone className="h-8 w-8 text-purple-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">POTS Replacement</h3>
                                            <p className="mt-2 text-gray-600 flex-grow">Modern alternatives to traditional phone lines</p>
                                            <div className="mt-4 flex items-center justify-center text-blue-600">
                                                Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/ai-consulting" className="group h-full">
                                        <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-shadow text-center h-full flex flex-col">
                                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                                                <Bot className="h-8 w-8 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">AI Consulting & Solutions</h3>
                                            <p className="mt-2 text-gray-600 flex-grow">Practical AI automation, strategy, and implementation services</p>
                                            <div className="mt-4 flex items-center justify-center text-blue-600">
                                                Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/internet-connectivity" className="group h-full">
                                        <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-shadow text-center h-full flex flex-col">
                                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 mb-4">
                                                <Wifi className="h-8 w-8 text-yellow-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Internet Connectivity</h3>
                                            <p className="mt-2 text-gray-600 flex-grow">High-speed internet solutions for business</p>
                                            <div className="mt-4 flex items-center justify-center text-blue-600">
                                                Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/ip-pbx" className="group h-full">
                                        <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-shadow text-center h-full flex flex-col">
                                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-pink-100 mb-4">
                                                <PhoneCall className="h-8 w-8 text-pink-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">IP PBX</h3>
                                            <p className="mt-2 text-gray-600 flex-grow">Advanced business phone systems</p>
                                            <div className="mt-4 flex items-center justify-center text-blue-600">
                                                Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/mobility-solutions" className="group h-full">
                                        <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-shadow text-center h-full flex flex-col">
                                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                                                <Smartphone className="h-8 w-8 text-blue-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Mobility Solutions</h3>
                                            <p className="mt-2 text-gray-600 flex-grow">Enterprise mobility management and solutions</p>
                                            <div className="mt-4 flex items-center justify-center text-blue-600">
                                                Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/voice-solutions" className="group h-full">
                                        <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-shadow text-center h-full flex flex-col">
                                            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4">
                                                <Mic className="h-8 w-8 text-indigo-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Voice Solutions</h3>
                                            <p className="mt-2 text-gray-600 flex-grow">Advanced voice communication systems</p>
                                            <div className="mt-4 flex items-center justify-center text-blue-600">
                                                Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="py-16 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="glass-morphism rounded-2xl p-8 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                                Why Choose Us?
                            </h2>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Handshake size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Expertise</h3>
                                    <p className="text-gray-600">
                                        With decades of experience in telecom and enterprise solutions, we understand the unique challenges businesses face in connectivity and infrastructure modernization.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Users size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Partnerships</h3>
                                    <p className="text-gray-600">
                                        We have successfully led high-profile projects with global telecom providers, government agencies, and Fortune 500 companies.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Zap size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Innovative Solutions</h3>
                                    <p className="text-gray-600">
                                        From cellular data technology to cloud-based communication systems, we offer future-proof solutions tailored to your needs.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Shield size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable & Scalable</h3>
                                    <p className="text-gray-600">
                                        Our solutions are designed for long-term success, helping businesses reduce costs, improve efficiency, and enhance communication capabilities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Trusted Partners Section */}
                <div className="relative py-16 bg-white-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Our Trusted Partners
                            </h2>
                        </div>

                        <div className="w-full">
                            <img
                                src="/partners/Partners-Banner-Desktop.png"
                                alt="Our Trusted Partners"
                                className="w-full hidden md:block"
                            />
                            <img
                                src="/partners/Partners-Banner-Mobile.png"
                                alt="Our Trusted Partners"
                                className="w-full md:hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative bg-blue-600">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            <span className="block">Ready to get started?</span>
                            <span className="block text-blue-200">Contact us today for a consultation.</span>
                        </h2>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link to="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
