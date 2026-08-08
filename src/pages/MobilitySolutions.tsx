import React from 'react';
import {
  Smartphone,
  BrainCircuit,
  Signal,
  Shield,
  Settings,
  DollarSign,
  Expand,
  MonitorSmartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';

const MobilitySolutions = () => {
  return (
      <div className="bg-navy-50">
        <Seo
          title="Mobility Solutions | TrustedNetworx"
          description="Enterprise mobility management from TrustedNetworx — MDaaS, IoT connectivity, and unified endpoint management to keep your mobile workforce secure and productive."
        />
        {/* Hero Section */}
        <div className="relative min-h-[460px] flex items-center overflow-hidden">
          {/* Background Video */}
          <HeroVideo
            name="hero-mobility"
            overlayClassName="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"
          />
          <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40"/>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                  Your workforce moves. Your network should keep up.
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Enterprise mobility management, pooled data plans, and LTE/5G deployments —
                  provisioned, secured, and supported so your IT team doesn&apos;t carry the pager
                  for it.
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
            <div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-100 to-transparent">
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-16">
              {/* Transform Your Mobility Section */}
              <div className="glass-morphism rounded-2xl p-8 text center">
                <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl text-center">
                  Enterprise Mobility Management
                </h2>
                <p className="mt-4 text-xl text-navy-600 text-center">
                  TrustedNetworx delivers comprehensive Enterprise Mobility Solutions designed to streamline device management, enhance security, and improve operational efficiency for your mobile workforce.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                  <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                    <div className="text-brand-600 mb-4">
                      <Smartphone size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Mobile Device as a Service (MDaaS)</h3>
                    <p className="mt-4 text-lg text-navy-600">
                      Experience a holistic approach to enterprise mobility with <b>MDaaS</b>, covering every phase of your devices' lifecycle. From procurement and configuration to deployment and ongoing support, MDaaS ensures seamless integration and management.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                    <div className="text-brand-600 mb-4">
                      <BrainCircuit size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">AI Consulting</h3>
                    <ul className="text-navy-600 space-y-2">
                      <p className="mt-4 text-lg text-navy-600">
                        Improve mobile workforce operations with <a className="text-brand-600 font-bold" href="/ai-consulting">AI Consulting Services</a>.
                        Automate repetitive workflows, surface operational insights, and reduce manual coordination across distributed teams.
                      </p>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                    <div className="text-brand-600 mb-4">
                      <Signal size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">IoT Connectivity</h3>
                    <p className="mt-4 text-lg text-navy-600">
                      Securely connect and manage your IoT devices globally.
                      Our solutions provide robust connectivity options, ensuring your devices stay online and operational, no matter where they are.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-card border border-navy-100">
                    <div className="text-brand-600 mb-4">
                      <MonitorSmartphone size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Unified Endpoint Management (UEM)</h3>
                    <p className="mt-4 text-lg text-navy-600">
                      Maintain control over all endpoints with UEM, offering centralized device management, security enforcement, and policy compliance across different operating systems and devices.
                    </p>
                  </div>
                </div>

                {/* Benefits Section*/}
                <div className="mt-8 glass-morphism rounded-2xl p-8">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-8 text-center">Benefits of Our Mobility Solutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-2">
                        <Settings className="h-6 w-6 text-brand-600 mr-3"/>
                        <h4 className="text-xl font-bold text-navy-900">Simplified Management</h4>
                      </div>
                      <p className="text-navy-600">
                        Our end-to-end services eliminate the complexities of device management, freeing your IT team to focus on strategic growth.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Shield className="h-6 w-6 text-brand-600 mr-3"/>
                        <h4 className="text-xl font-bold text-navy-900">Enhanced Security</h4>
                      </div>
                      <p className="text-navy-600">
                        Implement advanced security protocols to safeguard sensitive data and maintain industry compliance.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-6 w-6 text-brand-600 mr-3"/>
                        <h4 className="text-xl font-bold text-navy-900">Cost Efficiency</h4>
                      </div>
                      <p className="text-navy-600">
                        Benefit from cross-carrier pooling and competitive pricing models to optimize your mobility expenses.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Expand className="h-6 w-6 text-brand-600 mr-3"/>
                        <h4 className="text-xl font-bold text-navy-900">Scalability</h4>
                      </div>
                      <p className="text-navy-600">
                        Easily scale your mobility infrastructure to align with business growth and evolving technology.
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
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Mobilize Your Enterprise?
                  </h3>
                  <p className="text-lg text-brand-100 mb-8">
                    Partner with TrustedNetworx to transform your enterprise mobility strategy—ensuring your workforce stays connected, productive, and secure in today's fast-paced business environment.
                  </p>
                  <a
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                      href="/contact">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MobilitySolutions;
