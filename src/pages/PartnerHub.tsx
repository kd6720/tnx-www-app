import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Wallet, Eye, UserCheck, Layers } from 'lucide-react';
import Seo from '../components/Seo';
import MultiStepForm from '../components/MultiStepForm';

const capabilities = [
  {
    icon: Bot,
    title: 'Deploy from blueprints',
    body: 'Start from tested agent designs — outreach, inbound quoting, support triage, monitoring — and customize per client. Every agent inherits improvements to its core blueprint.',
  },
  {
    icon: Wallet,
    title: 'Control spend',
    body: 'Set a monthly budget per agent and per client. Hard stop, not a warning.',
  },
  {
    icon: Eye,
    title: 'See everything',
    body: 'Every action, message, and decision is logged with who approved it. Audit-ready.',
  },
  {
    icon: UserCheck,
    title: 'Keep humans in the loop',
    body: 'Define what an agent may do alone and what needs a click from a person.',
  },
  {
    icon: Layers,
    title: 'Multi-tenant by design',
    body: 'One hub, isolated client workspaces, role-based access.',
  },
];

const whoFor = [
  'MSPs adding an AI practice without hiring ML engineers',
  'Telecom agents and resellers who want a white-label AI offer',
  'Multi-site operators running their own agents for scheduling, quoting, and support',
];

const faqs = [
  {
    q: 'Which AI models does it use?',
    a: 'Model-agnostic; default is a cost-optimized provider with the option to bring your own keys.',
  },
  {
    q: 'Do I need developers?',
    a: 'No for blueprint agents. Yes for custom integrations, which we can build.',
  },
  {
    q: 'Where does it run?',
    a: 'Dedicated VPS per client or shared multi-tenant, your choice.',
  },
  {
    q: 'Is my client data isolated?',
    a: 'Yes — tenant isolation is enforced at the database layer, not just the UI.',
  },
];

const PartnerHub = () => {
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
        title="TNX Partner Hub — AI Agent Management Platform for MSPs & Channel Partners | TrustedNetworx"
        description="Deploy, budget, monitor, and govern AI agents for sales, support, and operations from one multi-tenant hub. Built by an operator, for MSPs and resellers."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'TNX Partner Hub',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description:
              'AI agent management platform for MSPs and channel partners: deploy, budget, monitor, and govern AI agents from one multi-tenant hub.',
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
              AI Agent Management
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              AI agents you can actually manage.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-200">
              Most AI tools give you a chatbot. Partner Hub gives you a workforce — with a manager.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#demo" className="btn-light">
                Request a demo
                <ArrowRight size={18} />
              </a>
              <a
                href="https://tnxpartnerhub.com"
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
              A fleet you can govern.
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
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900">
              Built for the channel.
            </h2>
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

      {/* How it fits with TNX CRM */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-navy-950 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How it fits with TNX CRM</h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-200">
              Agents in Partner Hub read and write to TNX CRM natively — leads qualified, calls
              logged, stages moved. One login, one data model.
            </p>
            <Link
              to="/platforms/crm"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
            >
              Explore TNX CRM
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
              Simple pricing — talk to us.
            </h2>
            <p className="mt-4 text-lg text-navy-500">
              Small deployments and multi-tenant / white-label plans are quoted based on your
              fleet. <strong>Talk to us</strong> and we'll scope it with you.
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
      <section id="demo" className="py-20 bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">See it with your own agents.</h2>
          <p className="mt-4 text-lg text-navy-200">Request a demo and we'll walk you through a tenant set up for your clients.</p>
          <div className="mt-8 text-left">
            <MultiStepForm preset="partner-hub" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerHub;
