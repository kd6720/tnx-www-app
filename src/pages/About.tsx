import React from 'react';
import {
    Shield, Award, Zap, Handshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const whyChooseUs = [
    {
        icon: Award,
        title: 'Proven Telecom Expertise',
        description:
            'Leverage decades of industry experience that equips us to tackle the complex challenges of connectivity and infrastructure modernization.',
    },
    {
        icon: Handshake,
        title: 'Strategic Global Partnerships',
        description:
            'Our track record includes spearheading high-profile projects with global telecom leaders, government bodies, and Fortune 500 companies.',
    },
    {
        icon: Zap,
        title: 'Future-Ready Solutions',
        description:
            'We deliver cutting-edge solutions—from cellular data technology to cloud-based communication systems—customized to meet your evolving needs.',
    },
    {
        icon: Shield,
        title: 'Dependable & Scalable Solutions',
        description:
            'Designed for long-term success, our strategies help reduce costs, enhance operational efficiency, and boost communication capabilities.',
    },
];

const About = () => {
    return (
        <div className="bg-navy-50">
            <Seo
                title="About Us | TrustedNetworx"
                description="With 25+ years in telecom and IoT, TrustedNetworx delivers advanced connectivity, voice, and managed solutions for enterprise and multi-site organizations."
            />
            {/* Hero Section */}
            <div className="relative min-h-[460px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/Handshake.jpg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"/>
                    <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40"/>
                </div>

                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                                Who we are
                            </span>
                            <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                                About TrustedNetworx
                            </h1>
                            <p className="mt-4 max-w-md mx-auto text-base text-navy-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Connecting businesses with cutting-edge telecommunication services
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
                </div>

                {/* Leading the Future of Telecom Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="glass-morphism rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Leading the Future of Telecom
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                With over 25 years of experience in the telecom and IoT industries,{' '}
                                <a
                                    href="https://trustednetworx.com"
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >TrustedNetworx
                                </a>{' '}
                                specializes in delivering advanced connectivity solutions that drive business success.
                                Our expertise spans IoT, M2M, cloud computing, and enterprise communication solutions,
                                enabling organizations to modernize their infrastructure, optimize operations, and stay
                                ahead in a rapidly evolving digital landscape.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="/Global-Connectivity.jpg"
                                alt="About TrustedNetworx"
                                className="max-w-full h-auto rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Your Trusted Telecom Partner Section */}
                <div className="w-full bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="glass-morphism rounded-2xl p-8 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                                Your Trusted Telecom Partner
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
                                Having worked with industry leaders such as AT&T, Verizon, T-Mobile, US Cellular, MetTel,
                                Fusion Connect, Xirgo Technologies, DataRemote and many more, we have a proven track
                                record of expanding market presence, forming strategic partnerships, and delivering
                                scalable telecom solutions. From POTS line replacement and enterprise mobility to IoT
                                connectivity and managed services, we help businesses transition to next-generation
                                networks with confidence.
                            </p>
                            <div className="mt-10">
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

                {/* Why Choose Us Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="glass-morphism rounded-2xl p-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
                            Why Choose TrustedNetworx?
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {whyChooseUs.map(({ icon: Icon, title, description }) => (
                                <div key={title} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4 flex justify-center">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
                                    <p className="text-gray-600 text-center">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Meet the Team CTA */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="glass-morphism rounded-2xl p-8 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Get to know the leadership and partners behind TrustedNetworx — bringing together decades of telecom expertise, AI-driven strategy, and creative vision.
                        </p>
                        <Link
                            to="/about/team"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300 shadow-lg"
                        >
                            Meet the Team
                        </Link>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pb-16">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 shadow-xl border border-gray-200">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Ready to Transform Your Telecommunications?
                            </h3>
                            <p className="text-lg text-blue-100 mb-8">
                                Let us help you navigate the future of telecom with expertise, reliability, and
                                innovation. Partner with us for a seamless transition into the next generation of
                                connectivity solutions.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                            >Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
