import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';

const capabilities = [
  { n: '01', title: 'Mobile Device as a Service (MDaaS)', desc: 'Procurement, configuration, deployment, and ongoing support — the full device lifecycle, handled end-to-end.' },
  { n: '02', title: 'Unified Endpoint Management (UEM)', desc: 'Centralized device management, security enforcement, and policy compliance across every OS.' },
  { n: '03', title: 'IoT connectivity', desc: 'Secure global connectivity for devices that can\u2019t drop — robust options that keep them online anywhere.' },
  { n: '04', title: 'AI consulting', desc: 'Automate mobile-workforce workflows and surface operational insight across distributed teams.' },
];

const benefits = [
  { n: '01', title: 'Simplified management', desc: 'End-to-end services that free your IT team from device management.' },
  { n: '02', title: 'Enhanced security', desc: 'Advanced security protocols that safeguard data and maintain compliance.' },
  { n: '03', title: 'Cost efficiency', desc: 'Cross-carrier pooling and competitive pricing on your mobility spend.' },
  { n: '04', title: 'Scalability', desc: 'Scale your mobility infrastructure with business growth.' },
];

const MobilitySolutions = () => (
  <div className="bg-canvas text-body antialiased">
    <Seo
      title="Mobility Solutions | TrustedNetworx"
      description="Enterprise mobility management from TrustedNetworx — MDaaS, IoT connectivity, and unified endpoint management to keep your mobile workforce secure and productive."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Mobility Solutions',
        provider: { '@type': 'Organization', name: 'TrustedNetworx' },
        areaServed: { '@type': 'Country', name: 'US' },
        serviceType: 'Enterprise Mobility Management',
        description: 'Enterprise mobility management and IoT connectivity.',
        url: 'https://trustednetworx.com/mobility-solutions',
      }}
    />

    {/* Hero */}
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950">
      <HeroVideo
        name="hero-mobility"
        mediaClassName="opacity-[0.34]"
        overlayClassName="absolute inset-0 bg-[linear-gradient(90deg,#0a1428_30%,rgba(10,20,40,0.55)_70%,rgba(10,20,40,0.35)_100%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-site px-6 py-24 md:px-gutter">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
            Mobility Solutions
          </span>
          <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
            Your workforce moves. Your network should keep up.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            Enterprise mobility management, pooled data plans, and LTE/5G deployments — provisioned,
            secured, and supported so your IT team doesn&apos;t carry the pager for it.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Get a quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* 01 — Capabilities */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              01 — Enterprise mobility
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Device management, secured end to end.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              Streamline device management, harden security, and improve operational efficiency for
              a distributed workforce.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {capabilities.map(({ n, title, desc }) => (
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

    {/* 02 — Benefits */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              02 — Benefits
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Why it pays for itself.
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
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Get started
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default MobilitySolutions;
