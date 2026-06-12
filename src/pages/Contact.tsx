import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', 'bot-field': '', ...formData }),
    })
      .then(() => setSubmitted(true))
      .catch(() => setError(true));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    'mt-1.5 block w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-navy-900 shadow-sm transition-colors placeholder:text-navy-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30';

  return (
    <div className="bg-navy-50">
      <Seo
        title="Contact Us | TrustedNetworx"
        description="Get in touch with the TrustedNetworx team to discuss your managed telecom, connectivity, voice, and AI needs."
      />

      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/Circuit-Board.jpg)',
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
              <p className="mt-2 text-navy-500">Tell us what you need and we'll get back to you shortly.</p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                  <h3 className="mt-4 text-xl font-bold text-navy-900">Thank you!</h3>
                  <p className="mt-2 text-navy-600">
                    Your message has been received. A member of our team will reach out soon.
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* Netlify hidden fields */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" onChange={handleChange} />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className={inputClass}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-navy-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className={inputClass}
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-navy-700">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        required
                        className={inputClass}
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className={inputClass}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className={inputClass}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy-700">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      className={inputClass}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-rose-600">
                      Something went wrong sending your message. Please email us directly at
                      carter@trustednetworx.com.
                    </p>
                  )}

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-navy-950 p-8 text-white relative overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/30 blur-3xl" />
                <h3 className="relative text-xl font-bold">Contact Information</h3>
                <div className="relative mt-6 space-y-5">
                  <a href="tel:13054987530" className="flex items-center gap-4 text-navy-200 transition-colors hover:text-white">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <Phone className="h-5 w-5 text-brand-300" />
                    </span>
                    305-498-7530
                  </a>
                  <a
                    href="mailto:carter@trustednetworx.com"
                    className="flex items-center gap-4 text-navy-200 transition-colors hover:text-white"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <Mail className="h-5 w-5 text-brand-300" />
                    </span>
                    carter@trustednetworx.com
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
                  TrustedNetworx is your partner in telecommunications solutions. We specialize in providing
                  cutting-edge technology solutions that help businesses stay connected, efficient, and
                  competitive in today's digital world.
                </p>
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
