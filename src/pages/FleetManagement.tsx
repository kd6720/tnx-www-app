import React from 'react';
import { MapPin, BarChart, Settings, DollarSign, Fuel, Zap, ShieldCheck, TrafficCone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FleetManagement = () => {
  return (
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[400px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0" style={{
            backgroundImage: 'url(/Circuit-Board.jpg)',
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
                  Fleet & Fuel Management Solutions
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Optimize your fleet operations with real-time tracking and comprehensive management tools
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
              {/* Transform Your Fleet Operations Section */}
              <div className="glass-morphism rounded-2xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                  Transform Your Fleet Operations
                </h2>
                <p className="mt-4 text-xl text-gray-600 text-center">
                  Optimize your fleet operations with TrustedNetworx's Fleet and Fuel Management Partner Solutions, designed to enhance efficiency, reduce costs, and ensure compliance across your entire vehicle network.​
                </p>

                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <MapPin size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time GPS Tracking</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Live Vehicle Location</li>
                      <li>• Historical Trip Data</li>
                      <li>• Geofencing Capabilities</li>
                      <li>• Real-time Notifications</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <Settings size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Maintenance Management</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Service Scheduling</li>
                      <li>• Maintenance Alerts</li>
                      <li>• Vehicle Diagnostics</li>
                      <li>• Repair History</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <Fuel size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fuel Management</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Fuel Consumption Tracking</li>
                      <li>• Cost Analysis</li>
                      <li>• Fuel Card Integration</li>
                      <li>• Efficiency Reports</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-blue-600 mb-4">
                      <BarChart size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Analysis</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Driver Performance Monitoring</li>
                      <li>• Vehicle Utilization Metrics</li>
                      <li>• Route Optimization</li>
                      <li>• Custom Reporting</li>
                    </ul>
                  </div>
                </div>

                {/* Benefits Section*/}
                <div className="mt-8 glass-morphism rounded-2xl p-8">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Benefits of Our Fleet Management Solutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-2">
                        <Zap className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Enhanced Efficiency</h4>
                      </div>
                      <p className="text-gray-600">
                        By leveraging real-time data and analytics, streamline operations, reduce downtime, and improve overall fleet performance.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Cost Reduction</h4>
                      </div>
                      <p className="text-gray-600">
                        Identify and eliminate inefficiencies, leading to significant savings on fuel and maintenance.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <ShieldCheck className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Regulatory Compliance</h4>
                      </div>
                      <p className="text-gray-600">
                        Maintain adherence to industry standards and regulations with automated tracking and reporting features.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <TrafficCone className="h-6 w-6 text-blue-600 mr-3"/>
                        <h4 className="text-xl font-bold text-gray-900">Improved Safety</h4>
                      </div>
                      <p className="text-gray-600">
                        Proactively address risky driving behaviors, fostering a culture of safety within your team.
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
                    Ready to Optimize Your Fleet?
                  </h3>
                  <p className="text-lg text-blue-100 mb-8">
                    Partner with TrustedNetworx to transform your fleet management strategy, ensuring your operations are efficient, compliant, and primed for success in today's competitive landscape.
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

export default FleetManagement;
