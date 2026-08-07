import React from 'react';
import {
    Shield,
    Zap,
    DollarSign,
    Bell,
    Building2,
    Printer,
    Router,
    ShoppingCart,
    PhoneForwarded,
    Building,
    DoorClosed,
    Wifi,
    Gauge,
    Terminal,
    Banknote,
    Activity,
    Server,
    Radio,
    Store,
    Ambulance,
    GraduationCap, Cog
} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/Seo';

const PotsReplacement = () => {
    const usesCases = [
        {icon: Printer, name: 'FAX'},
        {icon: Gauge, name: 'Meter Reading'},
        {icon: Bell, name: 'Burglar & Fire Alarm'},
        {icon: ShoppingCart, name: 'Point of Sale Terminals'},
        {icon: PhoneForwarded, name: 'Ring-Down (Audiodial)'},
        {icon: Terminal, name: 'Vending Machines'},
        {icon: Building2, name: 'Elevator, Paging, Taxi'},
        {icon: Banknote, name: 'ATM Machines'},
        {icon: Building, name: 'Apartment Call Box'},
        {icon: Activity, name: 'Telemetry'},
        {icon: DoorClosed, name: 'Gate Access'},
        {icon: Server, name: 'SMB Router/Gateway'},
        {icon: Router, name: 'Analog M2M'},
        {icon: Radio, name: '4G/5G Internet Access'},
        {icon: Terminal, name: 'Legacy Modem Support'},
        {icon: Wifi, name: 'Wireless Wi-Fi Access'}
    ];

    return (

        <div className="bg-navy-50">
            <Seo
                title="POTS Replacement | TrustedNetworx"
                description="Modern, cost-saving alternatives to legacy POTS lines. Migrate analog systems to reliable IP and cellular networks with TrustedNetworx."
            />
            {/* Hero Section */}
            <div className="relative min-h-[460px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/POTS-Line-Replacement-Banner.jpg)',
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
                            <img
                                className="w-48 mx-auto mb-4"
                                src="/POTS-IN-A-BOX-WHITE.png"
                                alt="DataRemote POTS IN A BOX">
                            </img>
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                                POTS Replacement Solutions
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Modern alternatives to traditional phone lines for your business
                            </p>
                            <div className="mt-8">
                                <Link to="/contact" className="btn-light">
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
                    <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"></div>
                    <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl"></div>
                </div>

                {/* Cutting the Landline Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        <div
                            className="glass-morphism rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">Cutting the Landline</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    As traditional Plain Old Telephone Service (POTS) lines become obsolete and carriers
                                    phase out support, businesses need reliable alternatives that offer improved
                                    functionality and cost savings.
                                </p>
                                <p className="mt-4 text-lg text-gray-600">
                                    Our POTS replacement solutions provide modern, digital alternatives that maintain
                                    compatibility with your existing equipment while adding new features and
                                    capabilities. We help you transition smoothly from legacy copper lines to IP-based
                                    solutions.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-gray-900 ml-4">Cost Savings</h3>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Reduce monthly telephone expenses by up to 50% while adding new capabilities
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <Shield className="h-8 w-8 text-blue-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-gray-900 ml-4">Enhanced Reliability</h3>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Improved uptime with built-in redundancy and disaster recovery options
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <Zap className="h-8 w-8 text-blue-600 flex-shrink-0"/>
                                        <h3 className="text-xl font-bold text-gray-900 ml-4">Future-Proof Solution</h3>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Stay ahead of copper retirement with modern IP-based technology
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All In One Solution Section */}
                <div className="relative py-16 ">
                    <div className="absolute inset-0 z-0 bg-blue-100/50" style={{filter: 'blur(10px)'}}/>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="glass-morphism rounded-2xl py-16 px-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                                An All-In-One POTS Replacement Solution
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                                <div className="prose prose-lg">
                                    <h3 className="text-3xl font-bold text-left">
                                        POTS IN A BOX® 90x2 (CDS-9010)
                                    </h3>
                                    <p className="mt-4 text-lg text-gray-600">
                                        <a
                                            href="https://dataremote.com/pots-in-a-box/90x2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 font-semibold"
                                            title="DataRemote POTS IN A BOX® 90x2"
                                        >
                                            POTS IN A BOX®
                                        </a>{' '}
                                        is the industry's first multi-carrier, multi-path POTS replacement solution — 
                                        connecting 2 analog lines over LTE, Wi-Fi, and Ethernet with battery backup. 
                                        It enables seamless migration of legacy PSTN-based analog systems to modern IP 
                                        and cellular data networks, supporting voice, fax, alarm signals, and emergency 
                                        communications.
                                    </p>

                                    {/* Certifications */}
                                    <div className="mt-6 space-y-2">
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Certifications & Compliance</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <span className="inline-flex items-center gap-1.5 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200">
                                                <Shield size={14} /> UL 62368-1 Listed
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200">
                                                <Shield size={14} /> UL 864 Listed
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200">
                                                <Shield size={14} /> CAL FIRE Listed
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200">
                                                <Shield size={14} /> FDNY Accepted
                                            </span>
                                        </div>
                                        <ul className="text-xs text-gray-500 mt-2 space-y-0.5">
                                            <li>• UL 62368-1 — Audio/Video &amp; IT Equipment Safety</li>
                                            <li>• UL 864 — Control Units for Fire Alarm Systems (NFPA 72 compliant)</li>
                                            <li>• Listed by the California Department of Forestry and Fire Protection</li>
                                            <li>• Accepted by the New York City Fire Department (FDNY)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-center rounded-2xl">
                                    <img
                                        src="/DataRemote-90X1-All-In-One-POTS-Replacement.png"
                                        alt="POTS IN A BOX Solution Diagram"
                                        className="max-w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* PTSN Market Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        {/* PTSN Sunset & The Market Section */}
                        <div className="glass-morphism rounded-2xl p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                                PTSN Sunset & The Market Shift
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 text-center">
                                POTS technology remains the backbone of infrastructure, seamlessly integrating into
                                every aspect of modern life.
                                These landlines connect essential devices such as electrical transformer stations,
                                security alarm panels, commercial HVAC systems, POS terminals, ATMs, traffic control
                                systems, and elevator emergency phones.
                            </p>

                            {/* Stats Section */}
                            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 items-center">
                                <div
                                    className="bg-white py-6 px-2 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <dt className="text-5xl font-extrabold text-blue-600">900M+</dt>
                                    <dd className="mt-2 font-medium text-gray-500">Legacy Landlines Globally</dd>
                                </div>

                                <div
                                    className="bg-white py-6 px-2 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <dt className="text-5xl font-extrabold text-blue-600">30M+</dt>
                                    <dd className="mt-2 font-medium text-gray-500">POTS Lines in the US</dd>
                                </div>

                                <div
                                    className="bg-white py-6 px-2 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <dt className="text-5xl font-extrabold text-blue-600">31.4%</dt>
                                    <dd className="mt-2 font-medium text-gray-500">Increase in POTS Costs Over The Past
                                        5 Years
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Use Cases Section with Wave Background */}
                <div className="relative py-16 ">
                    <div className="absolute inset-0 z-0 bg-blue-100/50" style={{filter: 'blur(10px)'}}/>
                    <div className="relative z-10">
                        <div className="lg:mx-32 px-4 sm:px-6 lg:px-8">
                            <div className="glass-morphism rounded-2xl py-16 px-8">
                                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                                    Supporting All Your POTS Replacement Needs
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                                    {usesCases.map((uc, i) => (
                                        <div key={i} className="flex flex-col items-center text-center">
                                            <uc.icon className="w-8 h-8 text-blue-600 mb-3"/>
                                            <p className="text-sm font-medium text-gray-900">{uc.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Compatible Systems Section */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        <div className="glass-morphism rounded-2xl p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                                Compatible Systems & Industries
                            </h2>

                            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-blue-600 mb-2 flex justify-center">
                                        <Store size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Retail</h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>Point of Sale Systems</li>
                                        <li>Fire Alarm Panels</li>
                                        <li>Security Alarms</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-blue-600 mb-2 flex justify-center">
                                        <Ambulance size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Healthcare</h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>Emergency Phones</li>
                                        <li>Paging Systems</li>
                                        <li>Fax Machines</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-blue-600 mb-2 flex justify-center">
                                        <GraduationCap size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Education</h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>Campus Security Systems</li>
                                        <li>Elevator Phones</li>
                                        <li>Safety Phones</li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-blue-600 mb-2 flex justify-center">
                                        <Cog size={32}/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Manufacturing</h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>Gate Entry Systems</li>
                                        <li>Fire Alarm Panels</li>
                                        <li>Meter Reading</li>
                                    </ul>
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
                                    Don't Let Outdated POTS Lines Slow Down Your Business
                                </h3>
                                <p className="text-lg text-blue-100 mb-8">
                                    Contact us today to learn how we can help you transition from legacy POTS lines to
                                    modern alternatives while maintaining compatibility with your existing systems.
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                                >Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PotsReplacement;