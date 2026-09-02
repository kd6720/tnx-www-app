import { Link } from 'react-router-dom';
import { ArrowRight, GitMerge, Database, FileText, Bot, BarChart3 } from 'lucide-react';
import Seo from '../components/Seo';

const capabilities = [
  {
    icon: GitMerge,
    title: 'Three channels, one pipeline view',
    body: 'Direct customers, agents, and resellers each get the right stages and commission fields.',
  },
  {
    icon: Database,
    title: 'Telecom-native records',
    body: 'Site counts, line inventories, contract terms, install and cutover dates, MRC/NRC on every opportunity.',
  },
  {
    icon: FileText,
    title: 'Quotes and renewals',
    body: 'Build a quote from an opportunity; get renewal alerts before the term ends.',
  },
  {
    icon: Bot,
    title: 'AI-maintained',
    body: "Agents from Partner Hub log calls, enrich contacts, qualify leads, and move stages so reps don't.",
  },
  {
    icon: BarChart3,
    title: 'Reporting that matters',
    body: 'Pipeline by channel, by vertical, by product; forecast by close date.',
  },
];

const whoFor = [
  'Telecom agents and MSPs tired of bending HubSpot or Pipedrive into shape',
  'Reseller programs that need partner-level visibility without exposing other partners\u2019 deals',
  'Small sales teams that want automation without an admin',
];

const faqs = [
  {
    q: 'Can I import from Pipedrive / HubSpot?',
    a: 'Yes — CSV import with field mapping.',
  },
  {
    q: 'Does it replace Partner Hub?',
    a: 'No. Partner Hub manages agents; TNX CRM manages deals. They share data.',
  },
  {
    q: 'Can partners see each other\u2019s deals?',
    a: 'No. Partner visibility is scoped to their own book.',
  },
];

const Crm = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="bg-navy-50">
      <Seo
        title="TNX CRM — Opportunity Management for Telecom, MSP & Channel Sales | TrustedNetworx"
        description="Track direct, agent, and reseller deals with telecom-native fields and AI agents that keep the pipeline current. Simple, flat pricing."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'TNX CRM',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description:
              'Opportunity management for telecom, MSP and channel sales: direct, agent, and reseller pipelines with telecom-native fields.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Talk to us for pricing' },
          },
          faqJsonLd,
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
              CRM / Opportunity Management
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The CRM that speaks telecom.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-200">
              Sites, lines, terms, install dates, MRC — first-class fields, not custom hacks.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#trial" className="btn-light">
                Start a trial
                <ArrowRight size={18} />
              </a>
              <a
                href="https://tnxcrm.com"
                className="btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow bg-brand-50 text-brand-700">What it does</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Deals, quotes, renewals — telecom-shaped.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-7 border border-navy-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
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

      {/* Who it's for */}
      <section className="py-20 bg-white border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow bg-brand-50 text-brand-700">Who it's for</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900">Built for channel sales.</h2>
          </div>
          <ul className="mt-10 space-y-4">
            {whoFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-navy-700">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it fits with Partner Hub */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-navy-950 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How it fits with Partner Hub</h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-200">
              Partner Hub manages agents; TNX CRM manages deals. They share one data model, so
              your AI agents write straight into your pipeline.
            </p>
            <Link
              to="/platforms/partner-hub"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
            >
              Explore Partner Hub
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow bg-brand-50 text-brand-700">Pricing</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900">
              Flat monthly, unlimited users up to a cap.
            </h2>
            <p className="mt-4 text-lg text-navy-500">
              No per-seat surprises. <strong>Talk to us</strong> and we'll match a plan to your
              channel.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-900 text-center">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl bg-white p-6 border border-navy-100 shadow-card">
                <h3 className="font-semibold text-navy-900">{f.q}</h3>
                <p className="mt-2 text-navy-500">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="trial" className="py-20 bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Try it on your own pipeline.</h2>
          <p className="mt-4 text-lg text-navy-200">Start a trial and import a CSV — we'll map your fields.</p>
          <div className="mt-8">
            <Link to="/contact" className="btn-light">
              Start a trial
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Crm;
