import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import MultiStepForm from '../components/MultiStepForm';

const benefits = [
  { n: '01', title: 'Commission & white-label', desc: 'Sell telecom and AI under your brand with margin, or earn commission on every deal you place.' },
  { n: '02', title: 'TNX Partner Hub access', desc: 'Run AI agents for your clients — sales outreach, quoting, and support — without building the plumbing.' },
  { n: '03', title: 'A partner team, not a queue', desc: 'Deal directly with the operators. Dedicated partner support and a real onboarding path.' },
];

const Partners = () => (
  <div className="bg-canvas text-body antialiased">
    <Seo
      title="Become a Partner — MSP & Reseller Program | TrustedNetworx"
      description="Join the TrustedNetworx partner program for MSPs, telecom agents, and resellers. White-label telecom and AI, TNX Partner Hub, and commission on every deal."
    />

    {/* Hero */}
    <section className="relative overflow-hidden bg-navy-950 py-28">
      <div className="mx-auto w-full max-w-site px-6 md:px-gutter">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
            Partner Program
          </span>
          <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
            Sell more with an operator behind you.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            TrustedNetworx gives MSPs, agents, and resellers a white-label telecom and AI practice —
            without hiring engineers or building the infrastructure.
          </p>
        </div>
      </div>
    </section>

    {/* 01 — Benefits */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              01 — The program
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Three ways to win with us.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {benefits.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-500">{n}</span>
                  <div>
                    <h3 className="font-display text-display-h3 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-body">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Form */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              02 — Get started
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Book a partner call.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              Tell us what you sell today and we&apos;ll build your onboarding path.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <MultiStepForm preset="partners" />
          </div>
        </div>
      </div>
    </section>

    {/* Email / Partner Hub */}
    <section className="bg-navy-950">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <p className="max-w-xl text-lg text-navy-200">
          Prefer email? Reach the partner team at{' '}
          <a href="mailto:sales@trustednetworx.com" className="text-brand-300 hover:text-brand-200">
            sales@trustednetworx.com
          </a>
          .
        </p>
        <Link
          to="/platforms/partner-hub"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
        >
          Explore TNX Partner Hub
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </div>
);

export default Partners;
