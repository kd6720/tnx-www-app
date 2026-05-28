import React from 'react';
import {
    Shield, Award, Zap, Handshake
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative min-h-[400px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/Handshake.jpg)',
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
                                About TrustedNetworx
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Connecting Businesses with Cutting-Edge Telecommunication Services
                            </p>
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

                {/* Leading the Future of Telecom Section */}
                <div className="relative py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="glass-morphism rounded-2xl py-16 px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                                <div className="prose prose-lg">
                                    <h2 className="text-lg font-extrabold sm:text-4xl text-left">
                                        Leading the Future of Telecom
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-600 pe-12">
                                        With over 25 years of experience in the telecom and IoT industries,{' '}
                                        <a
                                            href="https://trustednetworx.com"
                                            className="text-blue-600 hover:text-blue-800 font-semibold"
                                        > TrustedNetworx
                                        </a>{' '}
                                        specializes in delivering advanced connectivity solutions that drive business success. Our expertise spans IoT, M2M, cloud computing, and enterprise communication solutions, enabling organizations to modernize their infrastructure, optimize operations, and stay ahead in a rapidly evolving digital landscape.
                                    </p>
                                </div>
                                <div className="flex justify-center shadow-xl rounded-2xl">
                                    <img
                                        src="/Global-Connectivity.jpg"
                                        alt="About TrustedNetworx"
                                        className="max-w-full h-auto rounded-lg"
                                    />
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
                                Your Trusted Telecom Partner
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 pe-12">
                                Having worked with industry leaders such as AT&T, Verizon, T-Mobile, US Cellular, MetTel Fusion Connect, Xirgo Technologies, DataRemote and many more, we have a proven track record of expanding market presence, forming strategic partnerships, and delivering scalable telecom solutions. From POTS line replacement and enterprise mobility to IoT connectivity and managed services, we help businesses transition to next-generation networks with confidence.
                            </p>
                            <div className="my-8 glass-morphism rounded-2xl p-8">
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
                    </div>
                </div>






                {/* Why Choose Us Section */}
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="glass-morphism rounded-2xl p-8 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                                Why Choose TrustedNetworx?
                            </h2>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Award size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Telecom Expertise</h3>
                                    <p className="text-gray-600">
                                        Leverage decades of industry experience that equips us to tackle the complex challenges of connectivity and infrastructure modernization.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Handshake size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Global Partnerships</h3>
                                    <p className="text-gray-600">
                                        Our track record includes spearheading high-profile projects with global telecom leaders, government bodies, and Fortune 500 companies.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Zap size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Future-Ready Solutions</h3>
                                    <p className="text-gray-600">
                                        We deliver cutting-edge solutions—from cellular data technology to cloud-based communication systems—customized to meet your evolving needs.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Shield size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dependable & Scalable Solutions</h3>
                                    <p className="text-gray-600">
                                        Designed for long-term success, our strategies help reduce costs, enhance operational efficiency, and boost communication capabilities.
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
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Ready to Transform Your Telecommunications?
                                </h3>
                                <p className="text-lg text-blue-100 mb-8">
                                    Let us help you navigate the future of telecom with expertise, reliability, and innovation. Partner with us for a seamless transition into the next generation of connectivity solutions.
                                </p>
                                <a
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                                    href="/contact">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
