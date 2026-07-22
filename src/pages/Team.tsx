import React from 'react';
import {
    Shield, Award, Zap, Handshake, Video, Camera, Palette, Network, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const Team = () => {
    return (
        <div className="bg-navy-50">
            <Seo
                title="Our Team | TrustedNetworx"
                description="Meet the leadership and partners behind TrustedNetworx — telecom experts, enterprise architects, and creative professionals driving connectivity forward."
            />

            {/* Hero Section */}
            <div className="relative min-h-[400px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: 'url(/Handshake.jpg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"/>
                    <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40"/>
                </div>

                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                                Our People
                            </span>
                            <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                                Meet the Team
                            </h1>
                            <p className="mt-4 max-w-md mx-auto text-base text-navy-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                The people behind TrustedNetworx bring together deep telecom expertise and creative vision to help our clients succeed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"/>
                    <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"/>
                    <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl"/>
                </div>

                {/* Team Cards */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 gap-10 max-w-3xl mx-auto">
                        {/* Carter Dewey */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ring-2 ring-brand-200">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="bg-gradient-to-br from-navy-900 to-brand-900 flex items-center justify-center p-6">
                                    <img
                                        src="/team/carter-dewey.jpg"
                                        alt="Carter Dewey"
                                        className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover object-[65%_28%] border-4 border-brand-400/40 shadow-xl"
                                    />
                                </div>
                                <div className="md:col-span-2 p-6 md:p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Carter Dewey</h3>
                                    <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide mb-4">
                                        CEO &amp; Founder
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Carter Dewey is the CEO and Founder of TrustedNetworx, a leading solution provider of IoT, AI-driven, and managed telecommunications technology. He is responsible for overall company leadership, business development, sales strategy and forecasting, and coordination with key stakeholders and partners. Under his direction, TrustedNetworx helps businesses modernize their communications infrastructure — applying AI-powered solutioning to network monitoring, business continuity, and operational automation so customers can reduce risk, cut costs, and scale with confidence.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        A seasoned sales executive, Carter previously served as Senior Vice President of Global Sales for DataRemote, Inc., a leading IoT technology provider, where he led business development and global sales operations beginning in April 2016. His earlier experience includes 12 years with AT&amp;T, where he advanced into a leadership role as Signature Client Director, leading a team responsible for AT&amp;T's entire portfolio of products and services across enterprise accounts.
                                    </p>
                                    <div className="flex gap-3 mt-5">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <TrendingUp size={14} /> Business Development
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Handshake size={14} /> Strategic Partnerships
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Zap size={14} /> AI &amp; IoT Solutions
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Angele Castro */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center p-6">
                                    <img
                                        src="/team/angele-castro.jpg"
                                        alt="Angele Castro"
                                        className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-brand-400/30 shadow-xl"
                                    />
                                </div>
                                <div className="md:col-span-2 p-6 md:p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Angele Castro</h3>
                                    <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide mb-4">
                                        Enterprise Solutions Partner
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Angele brings deep expertise in enterprise technology solutions, helping organizations navigate complex infrastructure challenges with practical, results-driven strategies.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        As a TrustedNetworx partner, Angele focuses on building lasting client relationships through preparation, market intelligence, and a commitment to measurable outcomes.
                                    </p>
                                    <div className="flex gap-3 mt-5">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Network size={14} /> Enterprise Solutions
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Shield size={14} /> Infrastructure
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <TrendingUp size={14} /> Strategic Growth
                                        </span>
                                        <a href="https://www.linkedin.com/in/angelecastro/" target="_blank" rel="noopener noreferrer"
                                           className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors">
                                            🔗 LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deeno Perez */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center p-6">
                                    <img
                                        src="/team/deeno-perez.jpg"
                                        alt="Deeno Perez"
                                        className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-brand-400/30 shadow-xl"
                                    />
                                </div>
                                <div className="md:col-span-2 p-6 md:p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Deeno Perez</h3>
                                    <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide mb-4">
                                        Multimedia Specialist &amp; Business Content Creator
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Deeno is a Miami-based multimedia specialist and business content creator who helps brands, businesses, and professionals bring their stories to life through polished visual content. His work spans promotional videos, interview-style content, brand storytelling, social media visuals, product highlights, and project showcases.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        With a strong background in technology, operations, logistics, and visual production, Deeno brings both creative direction and business-minded precision to every project. He creates content that feels clean, professional, and purposeful — helping businesses present themselves in a way that feels credible, modern, and market-ready.
                                    </p>
                                    <div className="flex gap-3 mt-5">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Video size={14} /> Video Production
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Camera size={14} /> Brand Storytelling
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-navy-500 bg-navy-50 px-3 py-1 rounded-full">
                                            <Palette size={14} /> Visual Content
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pb-16">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 shadow-xl border border-gray-200">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Work With Our Team
                            </h3>
                            <p className="text-lg text-blue-100 mb-8">
                                Ready to put our expertise to work for your business? Let's start the conversation.
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

export default Team;
