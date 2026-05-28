import React from 'react';
import { PhoneCall, Users, Settings, Headphones, DollarSign, Network, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const IpPbx = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative min-h-[400px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/IP-PBX.jpg)',
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
                                IP PBX Solutions
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Advanced business phone systems for modern communication
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
                                Transform Your Business Communications
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 text-center">
                                Our IP PBX solutions combine traditional telephony with modern IP technology
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <PhoneCall size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Features</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Auto-attendant</li>
                                        <li>• Call queuing</li>
                                        <li>• Voice mail to email</li>
                                        <li>• Call recording</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <Users size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration Tools</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Video conferencing</li>
                                        <li>• Instant messaging</li>
                                        <li>• Presence information</li>
                                        <li>• Screen sharing</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <Settings size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Management</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Web-based interface</li>
                                        <li>• User management</li>
                                        <li>• Call reporting</li>
                                        <li>• System monitoring</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4">
                                        <Headphones size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Support</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• 24/7 technical support</li>
                                        <li>• Remote assistance</li>
                                        <li>• Regular updates</li>
                                        <li>• Training available</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Why Choose Us Section */}
                            <div className="mt-8 glass-morphism rounded-2xl p-8">
                                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Why Choose Our IP PBX Solution?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <DollarSign className="h-6 w-6 text-blue-600 mr-3" />
                                            <h4 className="text-xl font-bold text-gray-900">Cost Savings</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Reduce your communication costs with lower call rates and minimal hardware requirements.
                                            Eliminate the need for separate phone lines for each employee.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <Network className="h-6 w-6 text-blue-600 mr-3" />
                                            <h4 className="text-xl font-bold text-gray-900">Scalability</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Easily add new users and features as your business grows. No need for expensive
                                            hardware upgrades or complex installations.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <Globe className="h-6 w-6 text-blue-600 mr-3" />
                                            <h4 className="text-xl font-bold text-gray-900">Flexibility</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Work from anywhere with internet access. Support remote workers and multiple
                                            office locations with a unified system.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <Shield className="h-6 w-6 text-blue-600 mr-3" />
                                            <h4 className="text-xl font-bold text-gray-900">Reliability</h4>
                                        </div>
                                        <p className="text-gray-600">
                                            Enterprise-grade infrastructure ensures high availability and call quality.
                                            Built-in redundancy and failover capabilities.
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
                                    Ready to Modernize Your Business Phone System?
                                </h3>
                                <p className="text-lg text-blue-100 mb-8">
                                    Contact us today to learn how our IP PBX solutions can transform your business
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

export default IpPbx;