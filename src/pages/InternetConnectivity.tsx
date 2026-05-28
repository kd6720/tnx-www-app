import React from 'react';
import {Wifi, Shield, Zap, DollarSign, Globe, Network, Signal, Router, Headphones} from 'lucide-react';
import {Link} from 'react-router-dom';

const InternetConnectivity = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative min-h-[400px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/Internet-Connectivity.jpg)',
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
                                Internet Connectivity Solutions
                            </h1>
                            <p
                                className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Ensure your business remains agile, efficient, and securely connected with our
                                comprehensive
                                Internet Connectivity solutions
                            </p>
                            <div className="mt-8">
                                <Link to="mailto:carter@trustednetworx.com"
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

                {/* Available Solutions Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        <div className="glass-morphism rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">Enterprise-Grade Connectivity</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    In today's digital world, reliable internet connectivity is crucial for business
                                    success.
                                    Our
                                    solutions provide the speed, reliability, and security your business needs to stay
                                    competitive.
                                </p>
                                <p className="mt-4 text-lg text-gray-600">
                                    From dedicated internet access to SD-WAN solutions, we offer a comprehensive suite
                                    of
                                    connectivity
                                    options designed to meet your specific business requirements and ensure maximum
                                    uptime.
                                </p>
                                <div className="mt-8 space-y-6">
                                    <div className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             className="lucide lucide-wifi h-6 w-6 text-blue-600 flex-shrink-0 mt-1">
                                            <path d="M12 20h.01"></path>
                                            <path d="M2 8.82a15 15 0 0 1 20 0"></path>
                                            <path d="M5 12.859a10 10 0 0 1 14 0"></path>
                                            <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
                                        </svg>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Reliability</h3>
                                            <p className="mt-2 text-gray-600">
                                                Experience high-quality, uninterrupted connectivity backed by our robust
                                                infrastructure
                                                and support.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             className="lucide lucide-gauge h-6 w-6 text-blue-600 flex-shrink-0 mt-1">
                                            <path d="m12 14 4-4"></path>
                                            <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                                        </svg>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Scalability</h3>
                                            <p className="mt-2 text-gray-600">
                                                Easily adjust services to align with your business growth and evolving
                                                needs.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             className="lucide lucide-shield h-6 w-6 text-blue-600 flex-shrink-0 mt-1">
                                            <path
                                                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                                            </path>
                                        </svg>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Security</h3>
                                            <p className="mt-2 text-gray-600">
                                                Protect your data and communications with our advanced security measures
                                                and
                                                monitoring.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             className="lucide lucide-dollar-sign h-6 w-6 text-blue-600 flex-shrink-0 mt-1">
                                            <line x1="12" x2="12" y1="2" y2="22"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Cost Efficiency</h3>
                                            <p className="mt-2 text-gray-600">
                                                Optimize your IT investments with solutions designed to provide maximum
                                                value
                                                and
                                                performance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                                    Available Solutions
                                </h2>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <Router className="h-8 w-8 text-blue-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-gray-900 ml-4">Managed SD-WAN
                                            Services</h3>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Our award-winning SD-WAN combines MPLS, broadband internet circuits, and 4G-LTE
                                        to
                                        deliver a
                                        resilient and high-performance network. This intelligent network dynamically
                                        manages
                                        resources, offering improved performance, reliability, and security.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <Globe className="h-8 w-8 text-blue-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-gray-900 ml-4">Satellite Broadband</h3>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        As an authorized reseller of <a href="https://www.starlink.com"
                                                                        target="_blank"><b>Starlink</b></a> services and
                                        equipment, we provide
                                        high-speed,
                                        low-latency broadband internet access, even in remote locations. This ensures
                                        your
                                        business
                                        remains connected, regardless of geography.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <Signal className="h-8 w-8 text-blue-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-gray-900 ml-4">IoT Single SIM</h3>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Our IoT Single SIM card ensures your devices maintain connectivity at all times
                                        by
                                        intelligently roaming to find the strongest mobile signal, regardless of
                                        carrier.
                                        This
                                        global solution enhances security, reduces costs, and provides real-time data
                                        for
                                        effective
                                        device management.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="w-full bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="space-y-16">
                            <div className="glass-morphism rounded-2xl p-8 text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                                    Why Choose TrustedNetworx Solutions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100">
                                        <div className="text-blue-600 mb-4 flex justify-center">
                                            <Network size={32}/>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Customized
                                            IT Solutions
                                        </h3>
                                        <p className="text-gray-600">
                                            Our team expertly monitors and maintains your IT infrastructure,
                                            allowing you to focus
                                            on your core business operations without interruption. We provide fully
                                            managed fiber,
                                            broadband, and wireless 4G/LTE solutions, ensuring your networks are
                                            secure, efficient,
                                            and up-to-date.
                                        </p>
                                    </div>
                                    <div className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100"
                                         style={{background: 'rgba(255, 255, 255, 0.1)'}}>
                                        <div className="text-blue-600 mb-4 flex justify-center">
                                            <Headphones size={32}/>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Comprehensive
                                            Support</h3>
                                        <p className="text-gray-600">
                                            As a client, you'll have direct access to dedicated account managers,
                                            project managers,
                                            engineers, service technicians, and a customer care team to assist with
                                            all aspects of
                                            your networking needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        <div className="glass-morphism rounded-2xl p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                                Benefits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Wifi size={32}/>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Reliability</h3>
                                    <p className="text-gray-600 text-center text-sm">
                                        Experience uninterrupted connectivity backed by robust infrastructure.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Zap size={32}/>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Scalability</h3>
                                    <p className="text-gray-600 text-center text-sm">
                                        Easily adjust services as your business grows.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Shield size={32}/>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Security</h3>
                                    <p className="text-gray-600 text-center text-sm">
                                        Advanced security measures protect your data.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <DollarSign size={32}/>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Cost
                                        Efficiency</h3>
                                    <p className="text-gray-600 text-center text-sm">
                                        Optimize IT investments for maximum value.
                                    </p>
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
                                <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your
                                    Connectivity?</h3>
                                <p className="text-lg text-blue-100 mb-8">Partner with us to transform your
                                    communication
                                    infrastructure, ensuring your business stays connected and competitive in today's
                                    fast-paced
                                    environment.</p><a
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

export default InternetConnectivity;