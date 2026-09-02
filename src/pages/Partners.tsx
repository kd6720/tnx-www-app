import { ArrowRight, Handshake, Percent, Layers, Users } from 'lucide-react';
import Seo from '../components/Seo';
import MultiStepForm from '../components/MultiStepForm';

const benefits = [
  {
    icon: Percent,
    title: 'Commission & white-label',
    body: 'Sell telecom and AI under your brand with margin, or earn commission on every deal you place.',
  },
  {
    icon: Layers,
    title: 'TNX Partner Hub access',
    body: 'Run AI agents for your clients — sales outreach, quoting, and support — without building the plumbing.',
  },
  {
    icon: Users,
    title: 'A partner team, not a queue',
    body: 'Deal directly with the operators. Dedicated partner support and a real onboarding path.',
  },
];

const Partners = () => (
  <div className="bg-navy-50">
    <Seo
      title="Become a Partner — MSP & Reseller Program | TrustedNetworx"
      description="Join the TrustedNetworx partner program for MSPs, telecom agents, and resellers. White-label telecom and AI, TNX Partner Hub, and commission on every deal."
    />

    {/* Hero */}
    <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20">
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
            Partner Program
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sell more with an operator behind you.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            TrustedNetworx gives MSPs, agents, and resellers a white-label telecom and AI practice —
            without hiring engineers or building the infrastructure.
          </p>
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl bg-white p-7 border border-navy-100 shadow-card">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Form */}
    <section className="py-20 bg-white border-t border-navy-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow bg-brand-50 text-brand-700">Get started</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
            Book a partner call
          </h2>
          <p className="mt-4 text-lg text-navy-500">
            Tell us what you sell today and we'll build your onboarding path.
          </p>
        </div>
        <MultiStepForm preset="partners" />
      </div>
    </section>

    <section className="py-16 bg-navy-950 text-center">
      <Handshake className="mx-auto h-10 w-10 text-brand-300" />
      <p className="mt-4 max-w-xl mx-auto px-4 text-navy-200">
        Prefer email? Reach the partner team at{' '}
        <a href="mailto:sales@trustednetworx.com" className="text-brand-300 hover:text-brand-200">
          sales@trustednetworx.com
        </a>
        .
      </p>
      <a href="/platforms/partner-hub" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200">
        Explore TNX Partner Hub
        <ArrowRight size={16} />
      </a>
    </section>
  </div>
);

export default Partners;
