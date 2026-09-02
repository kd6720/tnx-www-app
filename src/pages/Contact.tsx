import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import MultiStepForm from '../components/MultiStepForm';

const Contact = () => {
  return (
    <div className="bg-navy-50">
      <Seo
        title="Contact Us | TrustedNetworx"
        description="Get in touch with the TrustedNetworx team to discuss your managed telecom, connectivity, voice, and AI needs."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'TrustedNetworx',
          telephone: '+1-305-498-7530',
          email: 'sales@trustednetworx.com',
          url: 'https://trustednetworx.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '18001 Old Cutler Rd',
            addressLocality: 'Miami',
            addressRegion: 'FL',
            postalCode: '33157',
            addressCountry: 'US',
          },
          openingHours: 'Mo-Fr 09:00-18:00',
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/Circuit-Board.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60" />
        </div>
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />
        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">Get in touch</span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Contact Us
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-navy-200">
              Get in touch with our team to discuss your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 rounded-2xl bg-white p-8 sm:p-10 border border-navy-100 shadow-card">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Get In Touch</h2>
              <p className="mt-2 text-navy-500">Fill out the form below and we'll get back to you shortly.</p>

              <div className="mt-8">
                <MultiStepForm preset="contact" />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-navy-950 p-8 text-white relative overflow-hidden">
                <h3 className="relative text-xl font-bold">Contact Information</h3>
                <div className="relative mt-6 space-y-5">
                  <a href="tel:+13054987530" className="flex items-center gap-4 text-navy-200 transition-colors hover:text-white">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <Phone className="h-5 w-5 text-brand-300" />
                    </span>
                    305-498-7530
                  </a>
                  <a
                    href="mailto:sales@trustednetworx.com"
                    className="flex items-center gap-4 text-navy-200 transition-colors hover:text-white"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <Mail className="h-5 w-5 text-brand-300" />
                    </span>
                    sales@trustednetworx.com
                  </a>
                  <div className="flex items-center gap-4 text-navy-200">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <MapPin className="h-5 w-5 text-brand-300" />
                    </span>
                    18001 Old Cutler Rd, Miami, FL 33157
                  </div>
                  <div className="flex items-center gap-4 text-navy-200">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock className="h-5 w-5 text-brand-300" />
                    </span>
                    Mon–Fri · 9:00 AM – 6:00 PM EST
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-navy-100 shadow-card">
                <h3 className="text-xl font-bold text-navy-900">About Us</h3>
                <p className="mt-3 text-navy-600 leading-relaxed">
                  TrustedNetworx is a Miami-based managed telecom provider. We replace legacy copper
                  lines, run cloud voice and connectivity for multi-site operators, and keep
                  compliance-critical lines — fire alarms, elevators, emergency phones — monitored
                  and inspection-ready.
                </p>
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-navy-50 p-4">
                  <img
                    src="/team/carter-dewey.webp"
                    alt="Carter Dewey"
                    width="48"
                    height="48"
                    className="h-12 w-12 rounded-full object-cover object-[65%_28%]"
                    loading="lazy"
                  />
                  <p className="text-sm text-navy-600">
                    <span className="font-semibold text-navy-900">You'll talk to Carter Dewey</span>, our
                    CEO — not a call queue.
                  </p>
                </div>
                <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
                  Learn more about us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
