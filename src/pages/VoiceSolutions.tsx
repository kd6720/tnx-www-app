import React from 'react';
import { PhoneCall, Mic, MessageSquare, Settings, Expand, AudioLines, BarChart, DollarSign, Users, Headphones, Network, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';

const VoiceSolutions = () => {
    return (
        <div className="bg-navy-50">
            <Seo
                title="Voice Solutions — IP PBX & Unified Communications | TrustedNetworx"
                description="Enterprise voice communications from TrustedNetworx — cloud-based IP PBX, HD voice, unified communications, voice analytics, and scalable cloud calling for modern business."
            />
            {/* Hero Section */}
            <div className="relative min-h-[460px] flex items-center overflow-hidden">
                {/* Background Video */}
                <HeroVideo
                    name="hero-voice"
                    overlayClassName="absolute inset-0 bg-gradient-to-r from-navy-950/95 to-navy-900/50"
                />

                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                                Unified Voice & IP PBX
                            </span>
                            <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                                One phone system. Every location. Zero on-prem headaches.
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-navy-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Cloud voice and unified communications that scale from a single office to
                                hundreds of sites — with the compliance, call routing, and analog integrations
                                enterprise operators actually need.
                            </p>
                            <p className="mt-4 max-w-md mx-auto text-sm text-navy-300 sm:text-base md:max-w-3xl">
                                Multi-site E911 done right: dispatchable location per station, Kari&apos;s Law
                                direct dialing, and on-site notification — configured per location, not bolted
                                on after.
                            </p>
                            <div className="mt-8">
                                <Link to="/contact" className="btn-light">
                                    Get a Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
                    <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="space-y-16">
                        {/* IP PBX Section */}
                        <div className="glass-morphism rounded-2xl p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                                Cloud-Based IP PBX
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 text-center">
                                Advanced business phone systems combining traditional telephony with modern IP technology
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><PhoneCall size={32} /></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Features</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Auto-attendant</li>
                                        <li>• Call queuing</li>
                                        <li>• Voice mail to email</li>
                                        <li>• Call recording</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><Users size={32} /></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Video conferencing</li>
                                        <li>• Instant messaging</li>
                                        <li>• Presence information</li>
                                        <li>• Screen sharing</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><Settings size={32} /></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Management</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Web-based interface</li>
                                        <li>• User management</li>
                                        <li>• Call reporting</li>
                                        <li>• System monitoring</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><Headphones size={32} /></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Support</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• 24/7 technical support</li>
                                        <li>• Remote assistance</li>
                                        <li>• Regular updates</li>
                                        <li>• Training available</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-brand-50 rounded-xl">
                                <div>
                                    <div className="flex items-center mb-2"><DollarSign className="h-6 w-6 text-brand-600 mr-3" /><h4 className="text-xl font-bold text-gray-900">Cost Savings</h4></div>
                                    <p className="text-gray-600">Reduce communication costs with lower call rates and minimal hardware requirements. Eliminate the need for separate phone lines for each employee.</p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2"><Network className="h-6 w-6 text-brand-600 mr-3" /><h4 className="text-xl font-bold text-gray-900">Scalability</h4></div>
                                    <p className="text-gray-600">Easily add new users and features as your business grows. No expensive hardware upgrades or complex installations.</p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2"><Globe className="h-6 w-6 text-brand-600 mr-3" /><h4 className="text-xl font-bold text-gray-900">Flexibility</h4></div>
                                    <p className="text-gray-600">Work from anywhere with internet access. Support remote workers and multiple office locations with a unified system.</p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2"><Shield className="h-6 w-6 text-brand-600 mr-3" /><h4 className="text-xl font-bold text-gray-900">Reliability</h4></div>
                                    <p className="text-gray-600">Enterprise-grade infrastructure ensures high availability and call quality. Built-in redundancy and failover capabilities.</p>
                                </div>
                            </div>
                        </div>

                        {/* Unified Communications Section */}
                        <div className="glass-morphism rounded-2xl p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                                Enterprise Voice Communications
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 text-center">
                                Comprehensive voice solutions that enhance business communication and collaboration
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><PhoneCall size={32}/></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Voice Services</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• HD Voice Quality</li>
                                        <li>• Toll-Free Numbers</li>
                                        <li>• Local Numbers</li>
                                        <li>• International Calling</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><Mic size={32}/></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Voice Features</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Voice Recognition</li>
                                        <li>• Voice Analytics</li>
                                        <li>• Call Recording</li>
                                        <li>• Voice Transcription</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><MessageSquare size={32}/></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Comms</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Voice & Video</li>
                                        <li>• Instant Messaging</li>
                                        <li>• Presence Information</li>
                                        <li>• Team Collaboration</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="text-blue-600 mb-4"><Settings size={32}/></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Management</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Call Analytics</li>
                                        <li>• Quality Monitoring</li>
                                        <li>• System Administration</li>
                                        <li>• User Management</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-brand-50 rounded-xl">
                                <div>
                                    <div className="flex items-center mb-2"><AudioLines className="h-6 w-6 text-brand-600 mr-3"/><h4 className="text-xl font-bold text-gray-900">Enhanced Quality</h4></div>
                                    <p className="text-gray-600">Crystal-clear voice quality with HD audio and advanced noise cancellation. Reliable service with guaranteed uptime and redundancy.</p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2"><DollarSign className="h-6 w-6 text-brand-600 mr-3"/><h4 className="text-xl font-bold text-gray-900">Cost Efficiency</h4></div>
                                    <p className="text-gray-600">Reduce communication costs with competitive calling rates and bundled services. Eliminate hardware costs with cloud-based solutions.</p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2"><BarChart className="h-6 w-6 text-brand-600 mr-3"/><h4 className="text-xl font-bold text-gray-900">Advanced Features</h4></div>
                                    <p className="text-gray-600">Access modern features like voice analytics, transcription, and intelligent routing. Integrate with your existing business applications.</p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2"><Expand className="h-6 w-6 text-brand-600 mr-3"/><h4 className="text-xl font-bold text-gray-900">Scalability</h4></div>
                                    <p className="text-gray-600">Easily scale your voice services up or down based on business needs. Add new features and users without complex infrastructure changes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pb-16">
                    <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-8 shadow-xl">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Ready to Modernize Your Voice Communications?
                            </h3>
                            <p className="text-lg text-brand-100 mb-8">
                                From cloud IP PBX to enterprise unified communications — let's find the right voice solution for your business.
                            </p>
                            <Link to="/contact" className="btn-light">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceSolutions;
