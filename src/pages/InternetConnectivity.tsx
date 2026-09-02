import React from 'react';
import {Wifi, Shield, DollarSign, Gauge, Globe, Network, Signal, Router, Headphones} from 'lucide-react';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import MultiStepForm from '../components/MultiStepForm';

const InternetConnectivity = () => {
    return (
        <div className="bg-navy-50">
            <Seo
                title="Internet Connectivity | TrustedNetworx"
                description="Enterprise-grade internet connectivity — managed SD-WAN, Starlink satellite broadband, and global IoT SIM solutions to keep your business securely online."
            />
            {/* Hero Section */}
            <div className="relative min-h-[460px] flex items-center overflow-hidden">
                {/* Background Video */}
                <HeroVideo
                    name="hero-connectivity"
                    overlayClassName="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"
                />
                <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40"/>

                <div className="relative z-10 w-full pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                                Connectivity your locations can&apos;t afford to lose.
                            </h1>
                            <p
                                className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                High-speed primary circuits with LTE/5G wireless failover, managed and monitored
                                across every site. One vendor, one SLA, no finger-pointing between carriers.
                            </p>
                            <div className="mt-8">
                                <a href="#quote" className="btn-light">
                                    Get a Quote
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-100 to-transparent">
                    </div>
                </div>

                {/* Available Solutions Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        <div className="glass-morphism rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-extrabold text-navy-900">Enterprise-Grade Connectivity</h2>
                                <p className="mt-4 text-lg text-navy-600">
                                    When a location loses internet, it loses phones, payments, and access control
                                    with it. We build connectivity that doesn't go down: primary circuits sized to
                                    the site, LTE/5G failover that kicks in automatically, and monitoring that
                                    catches problems before your staff does.
                                </p>
                                <p className="mt-4 text-lg text-navy-600">
                                    From dedicated internet access to SD-WAN solutions, we offer a comprehensive suite
                                    of
                                    connectivity
                                    options designed to meet your specific business requirements and ensure maximum
                                    uptime.
                                </p>
                                <div className="mt-8 space-y-6">
                                    <div className="flex items-start">
                                        <Wifi className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-navy-900">Reliability</h3>
                                            <p className="mt-2 text-navy-600">
                                                Experience high-quality, uninterrupted connectivity backed by our robust
                                                infrastructure
                                                and support.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Gauge className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-navy-900">Scalability</h3>
                                            <p className="mt-2 text-navy-600">
                                                Easily adjust services to align with your business growth and evolving
                                                needs.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Shield className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-navy-900">Security</h3>
                                            <p className="mt-2 text-navy-600">
                                                Protect your data and communications with our advanced security measures
                                                and
                                                monitoring.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <DollarSign className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-navy-900">Cost Efficiency</h3>
                                            <p className="mt-2 text-navy-600">
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
                                <h2 className="text-3xl font-extrabold text-navy-900 text-center mb-8">
                                    Available Solutions
                                </h2>
                                <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                                    <div className="flex items-center">
                                        <Router className="h-8 w-8 text-brand-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-navy-900 ml-4">Managed SD-WAN
                                            Services</h3>
                                    </div>
                                    <p className="mt-4 text-navy-600">
                                        Our award-winning SD-WAN combines MPLS, broadband internet circuits, and 4G-LTE
                                        to
                                        deliver a
                                        resilient and high-performance network. This intelligent network dynamically
                                        manages
                                        resources, offering improved performance, reliability, and security.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                                    <div className="flex items-center">
                                        <Globe className="h-8 w-8 text-brand-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-navy-900 ml-4">Satellite Broadband</h3>
                                    </div>
                                    <p className="mt-4 text-navy-600">
                                        As an authorized reseller of <a href="https://www.starlink.com"
                                                                        target="_blank" rel="noopener noreferrer"><b>Starlink</b></a> services and
                                        equipment, we provide
                                        high-speed,
                                        low-latency broadband internet access, even in remote locations. This ensures
                                        your
                                        business
                                        remains connected, regardless of geography.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                                    <div className="flex items-center">
                                        <Signal className="h-8 w-8 text-brand-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-navy-900 ml-4">IoT Single SIM</h3>
                                    </div>
                                    <p className="mt-4 text-navy-600">
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
                <div className="w-full bg-brand-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="space-y-16">
                            <div className="glass-morphism rounded-2xl p-8 text-center">
                                <h2 className="text-3xl font-extrabold text-navy-900 mb-8">
                                    Why Choose TrustedNetworx Solutions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="glass-morphism p-6 rounded-xl shadow-card border border-navy-100">
                                        <div className="text-brand-600 mb-4 flex justify-center">
                                            <Network size={32}/>
                                        </div>
                                        <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Customized
                                            IT Solutions
                                        </h3>
                                        <p className="text-navy-600">
                                            Our team expertly monitors and maintains your IT infrastructure,
                                            allowing you to focus
                                            on your core business operations without interruption. We provide fully
                                            managed fiber,
                                            broadband, and wireless 4G/LTE solutions, ensuring your networks are
                                            secure, efficient,
                                            and up-to-date.
                                        </p>
                                    </div>
                                    <div className="glass-morphism p-6 rounded-xl shadow-card border border-navy-100"
                                         style={{background: 'rgba(255, 255, 255, 0.1)'}}>
                                        <div className="text-brand-600 mb-4 flex justify-center">
                                            <Headphones size={32}/>
                                        </div>
                                        <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Comprehensive
                                            Support</h3>
                                        <p className="text-navy-600">
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


                {/* CTA Section */}
                <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pb-16">
                    <div className="space-y-16">
                        <div
                            className="bg-gradient-to-r from-brand-700 to-brand-600 rounded-xl p-8 shadow-xl border border-navy-100">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your
                                    Connectivity?</h3>
                                <p className="text-lg text-brand-100 mb-8">Partner with us to transform your
                                    communication
                                    infrastructure, ensuring your business stays connected and competitive in today's
                                    fast-paced
                                    environment.</p><a
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                                href="#quote">Get a Quote</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lead Capture Form */}
            <section id="quote" className="relative py-16 sm:py-20 bg-navy-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
                            Get a multi-site quote
                        </h2>
                        <p className="mt-3 text-lg text-navy-500">
                            Tell us about your sites and we'll come back with a plan and pricing within one
                            business day.
                        </p>
                    </div>
                    <MultiStepForm preset="connectivity" />
                </div>
            </section>

        </div>
    );
};

export default InternetConnectivity;