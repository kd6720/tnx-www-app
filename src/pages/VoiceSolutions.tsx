import React from 'react';
import { PhoneCall, Mic, MessageSquare, Settings, Expand, AudioLines, BarChart, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const VoiceSolutions = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative min-h-[400px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/Voice-Solutions.jpg)',
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
                                Voice Solutions
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Advanced voice communication systems for modern business
                            </p>
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

            <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent">
                    </div>
                    <div className="absolute shadow-xl w-1/2 h-[1000px] bg-blue-100 -skew-x-12 -left-1/4"></div>
                    <div className="absolute shadow-xl w-1/2 h-full bg-blue-100 skew-x-12 -right-1/4 top-1/4"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        {/* Transform Your Communications Section */}
                        <div className="glass-morphism rounded-2xl p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                                Enterprise Voice Communications
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 text-center">
                                Comprehensive voice solutions that enhance business communication and collaboration
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <PhoneCall size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Voice Services</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• HD Voice Quality</li>
                                        <li>• Toll-Free Numbers</li>
                                        <li>• Local Numbers</li>
                                        <li>• International Calling</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <Mic size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Voice Features</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Voice Recognition</li>
                                        <li>• Voice Analytics</li>
                                        <li>• Call Recording</li>
                                        <li>• Voice Transcription</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <MessageSquare size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Communications</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Voice & Video</li>
                                        <li>• Instant Messaging</li>
                                        <li>• Presence Information</li>
                                        <li>• Team Collaboration</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <Settings size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Management</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Call Analytics</li>
                                        <li>• Quality Monitoring</li>
                                        <li>• System Administration</li>
                                        <li>• User Management</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Benefits Section*/}
                            <div className="mt-8 glass-morphism rounded-2xl p-8">
                                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Benefits of Our Voice Solutions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <AudioLines className="h-6 w-6 text-blue-600 mr-3"/>
                                            <h4 className="text-xl font-bold text-gray-900">Enhanced Quality</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Crystal-clear voice quality with HD audio and advanced noise
                                            cancellation.
                                            Reliable service with guaranteed uptime and redundancy.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <DollarSign className="h-6 w-6 text-blue-600 mr-3"/>
                                            <h4 className="text-xl font-bold text-gray-900">Cost Efficiency</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Reduce communication costs with competitive calling rates and bundled
                                            services.
                                            Eliminate hardware costs with cloud-based solutions.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <BarChart className="h-6 w-6 text-blue-600 mr-3"/>
                                            <h4 className="text-xl font-bold text-gray-900">Advanced Features</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Access modern features like voice analytics, transcription, and
                                            intelligent routing.
                                            Integrate with your existing business applications.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <Expand className="h-6 w-6 text-blue-600 mr-3"/>
                                            <h4 className="text-xl font-bold text-gray-900">Scalability</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Easily scale your voice services up or down based on business needs.
                                            Add new features and users without complex infrastructure changes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pb-16">
                    <div className="space-y-16">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 shadow-xl border border-gray-200">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Ready to Enhance Your Voice Communications?
                                </h3>
                                <p className="text-lg text-blue-100 mb-8">
                                    Contact us today to learn how our voice solutions can transform your business
                                    communications.
                                </p>
                                <a
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                                    href="/contact">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceSolutions;