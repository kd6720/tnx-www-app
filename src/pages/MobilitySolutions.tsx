import React from 'react';
import {
  Smartphone,
  Truck,
  Signal,
  Shield,
  Settings,
  DollarSign,
  Expand,
  MonitorSmartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MobilitySolutions = () => {
  return (
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[400px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0" style={{
            backgroundImage: 'url(/Mobility-Solutions.jpg)',
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
                  Mobility Solutions
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Empower Your Business with TrustedNetworx Enterprise Mobility Solutions
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
              {/* Transform Your Mobility Section */}
              <div className="glass-morphism rounded-2xl p-8 text center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                  Enterprise Mobility Management
                </h2>
                <p className="mt-4 text-xl text-gray-600 text-center">
                  TrustedNetworx delivers comprehensive Enterprise Mobility Solutions designed to streamline device management, enhance security, and improve operational efficiency for your mobile workforce.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <Smartphone size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Device as a Service (MDaaS)</h3>
                    <p className="mt-4 text-lg text-gray-600">
                      Experience a holistic approach to enterprise mobility with <b>MDaaS</b>, covering every phase of your devices' lifecycle. From procurement and configuration to deployment and ongoing support, MDaaS ensures seamless integration and management.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <Truck size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fleet Management</h3>
                    <ul className="text-gray-600 space-y-2">
                      <p className="mt-4 text-lg text-gray-600">
                        Optimize your mobile assets with our advanced <a className="text-blue-600 font-bold" href="/fleet-management">Fleet Management Services</a>.
                        Gain real-time insights into vehicle locations, driver behaviors, and maintenance needs to enhance efficiency and reduce operational costs.
                      </p>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <Signal size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">IoT Connectivity</h3>
                    <p className="mt-4 text-lg text-gray-600">
                      Securely connect and manage your IoT devices globally.
                      Our solutions provide robust connectivity options, ensuring your devices stay online and operational, no matter where they are.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <MonitorSmartphone size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Endpoint Management (UEM)</h3>
                    <p className="mt-4 text-lg text-gray-600">
                      Maintain control over all endpoints with UEM, offering centralized device management, security enforcement, and policy compliance across different operating systems and devices.
                    </p>
                  </div>
                </div>

                {/* Benefits Section*/}
                <div className="mt-8 glass-morphism rounded-2xl p-8">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Benefits of Our Mobility Solutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-2">
                        <Settings className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Simplified Management</h4>
                      </div>
                      <p className="text-gray-600">
                        Our end-to-end services eliminate the complexities of device management, freeing your IT team to focus on strategic growth.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Shield className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Enhanced Security</h4>
                      </div>
                      <p className="text-gray-600">
                        Implement advanced security protocols to safeguard sensitive data and maintain industry compliance.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Cost Efficiency</h4>
                      </div>
                      <p className="text-gray-600">
                        Benefit from cross-carrier pooling and competitive pricing models to optimize your mobility expenses.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Expand className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Scalability</h4>
                      </div>
                      <p className="text-gray-600">
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
                  className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 shadow-xl border border-gray-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Mobilize Your Enterprise?
                  </h3>
                  <p className="text-lg text-blue-100 mb-8">
                    Partner with TrustedNetworx to transform your enterprise mobility strategy—ensuring your workforce stays connected, productive, and secure in today's fast-paced business environment.
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

export default MobilitySolutions;