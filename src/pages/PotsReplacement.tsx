import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import MultiStepForm from '../components/MultiStepForm';
import { HUB_MODELS, PRODUCTS, REPLACED_ENDPOINTS } from '../data/potsProducts';

/**
 * POTS Replacement hub.
 *
 * Two things on this page have been wrong before and must stay right:
 *
 *  1. Line counts. The model number is not the line count — see
 *     src/data/potsProducts.ts, which is the single source of truth for the
 *     hardware table. Do not hand-write model specs into this file.
 *  2. Compliance attribution. Device certifications belong to DataRemote, the
 *     911/Kari's Law/RAY BAUM'S obligations belong to the MIX Networks voice
 *     network, and the deployment belongs to us. Collapsing those three layers
 *     into one claim is how a site ends up representing something it cannot
 *     support in front of an AHJ.
 */

/** The three compliance layers. Wording here is deliberate — see file header. */
const complianceLayers = [
  {
    n: '01',
    title: 'The device — DataRemote',
    desc:
      'The 90X1 and 90X2 are aligned with UL 864 and NFPA 72 requirements for fire alarm signal transmission, carry CSFM listing 7305-2384:0002, and hold UL 2054 (MH63085) battery listings. NFPA 72 is a code applying to the installed system, not a product certification — the AHJ decides whether a given installation meets it.',
  },
  {
    n: '02',
    title: 'The network — MIX Networks',
    desc:
      'E911 address association and dispatchable-location assignment, 911-call notification to designated on-site contacts, Kari’s Law and RAY BAUM’S Act support, Hosted PBX routing, SOC 2 data centres, and toll-fraud and SIP-anomaly protection are met on the carrying voice network, not by the endpoint hardware.',
  },
  {
    n: '03',
    title: 'The deployment — TrustedNetworx',
    desc:
      'Site survey, model selection, AHJ coordination, installation, cutover and lifecycle monitoring. Fire alarm and elevator vendors are engaged before cutover, not after an inspection fails.',
  },
  {
    n: '04',
    title: 'Fire alarm transmission — FDNY',
    desc:
      'FDNY conditionally accepted MIX Networks as a Managed Facilities Voice Network for fire alarm signal transmission using approved equipment. That acceptance is specific to fire alarm signal transmission and to approved equipment — we scope it that way in every proposal.',
  },
];

const cutover = [
  { n: '01', title: 'Line audit', desc: 'Every analog line inventoried by site, endpoint type, carrier and monthly cost.' },
  { n: '02', title: 'Design', desc: 'Model selection per site based on coverage, line count and life-safety scope.' },
  { n: '03', title: 'AHJ coordination', desc: 'Fire alarm vendor, elevator contractor and local authority engaged before any cutover date is set.' },
  { n: '04', title: 'Install and cutover', desc: 'Installs are typically completed within a few hours per site, with the analog path kept live until the replacement is verified.' },
  { n: '05', title: 'Monitor', desc: 'Every unit enrolled in Ara and watched by our NOC — line-state alerts, remote diagnostics, firmware lifecycle.' },
];

const industries = [
  { n: '01', title: 'Senior living & healthcare', desc: 'Emergency phones, nurse call trunks, fire panels, fax lines.' },
  { n: '02', title: 'Property management', desc: 'Elevator phones, gate entry, callboxes across scattered-site portfolios.' },
  { n: '03', title: 'Hospitality', desc: 'Fire alarm panels, elevator lines, POS and back-office fax.' },
  { n: '04', title: 'Retail & multi-site', desc: 'POS terminals, ATMs, burglar and fire alarm transmission at scale.' },
];

const PotsReplacement = () => (
  <div className="bg-canvas text-body antialiased">
    <Seo
      title="POTS Replacement | TrustedNetworx"
      description="Replace legacy analog lines with the DataRemote POTS IN A BOX platform — 8-line 5G and LTE units with 48-hour battery backup, aligned with UL 864, deployed and monitored by TrustedNetworx."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'POTS Replacement',
        provider: { '@type': 'Organization', name: 'TrustedNetworx' },
        areaServed: { '@type': 'Country', name: 'US' },
        serviceType: 'Telecom Line Replacement',
        description: 'Modern, cost-saving alternatives to legacy POTS lines.',
        url: 'https://trustednetworx.com/pots-replacement',
      }}
    />

    {/* Hero */}
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950">
      <HeroVideo
        name="hero-pots"
        mediaClassName="opacity-[0.34]"
        overlayClassName="absolute inset-0 bg-[linear-gradient(90deg,#0a1428_30%,rgba(10,20,40,0.55)_70%,rgba(10,20,40,0.35)_100%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-site px-6 py-24 md:px-gutter">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
            POTS Replacement
          </span>
          <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
            The copper shutdown isn&apos;t coming. It&apos;s here.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            Carriers are retiring analog lines and raising rates on what&apos;s left. We migrate
            fire alarms, elevators, emergency phones and fax lines to managed wireless and SIP —
            code-coordinated, monitored 24/7, and usually at a fraction of the copper bill.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#quote" className="btn-primary">
              Get a free line audit
              <ArrowRight size={18} />
            </a>
            <Link to="/tools/pots-roi-calculator" className="btn-outline">
              Calculate your savings
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* 01 — The problem */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              01 — The problem
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Copper is being retired around your equipment.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <p className="text-lg leading-relaxed text-body">
              Copper retirement is not a future event you can schedule around. Carriers file to
              discontinue legacy service route by route, and the practical experience is a rate
              increase, then a repair that never gets scheduled, then a line that stops working
              during an inspection. Industry estimates still put roughly 40 million analog lines
              in service across the US — the majority attached to equipment nobody thinks about
              until it fails.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-body">
              The exposure is rarely the phone on someone&apos;s desk. It is the elevator phone,
              the fire alarm panel&apos;s transmission path, and the emergency callbox — lines
              that carry a compliance obligation and cannot simply be dropped.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 02 — The hardware */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              02 — Hardware
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              The hardware we actually deploy.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              The DataRemote POTS IN A BOX&reg; family terminates real analog lines on real FXS
              ports and carries them over a managed cellular path with code-relevant battery
              backup. Note the line counts below — the model number is not the number of lines.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted-text">Model</th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted-text">Analog lines</th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted-text">Network</th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted-text">Battery</th>
                    <th className="py-3 font-mono text-xs uppercase tracking-mono-label text-muted-text">Best fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {HUB_MODELS.map(({ slug, model, lines, network, battery, bestFor }) => (
                    <tr key={model}>
                      <td className="py-4 pr-4 align-top">
                        <Link
                          to={`/pots-replacement/${slug}`}
                          className="font-display text-display-h3 font-semibold text-ink underline-offset-4 hover:underline"
                        >
                          {model}
                        </Link>
                      </td>
                      <td className="py-4 pr-4 align-top text-base text-body">{lines}</td>
                      <td className="py-4 pr-4 align-top text-base text-body">{network}</td>
                      <td className="py-4 pr-4 align-top text-base text-body">{battery}</td>
                      <td className="py-4 align-top text-base text-body">{bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {HUB_MODELS.map(({ slug }) => {
                const p = PRODUCTS[slug];
                return (
                  <li key={slug} className="bg-white">
                    <Link to={`/pots-replacement/${slug}`} className="group block h-full p-6">
                      <span className="font-mono text-xs uppercase tracking-mono-label text-muted-text">
                        {p.eyebrow}
                      </span>
                      <h3 className="mt-3 font-display text-display-h3 font-semibold text-ink">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-body">{p.bestFor}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-mono-label text-accent-text">
                        Full specifications
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* 03 — Compliance */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              03 — Compliance
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Compliance lives in three layers.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              Most POTS-replacement pitches blur the device, the network and the installation into
              a single &ldquo;fully compliant&rdquo; claim. An AHJ will not. Here is who is
              responsible for what.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {complianceLayers.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-text">{n}</span>
                  <div>
                    <h3 className="font-display text-display-h3 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-body">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-hairline pt-6">
              {/* text-body, not text-muted-text: #6b7587 clears AA on the white
                  sections but not on the #f7f8fa canvas this section sits on. */}
              <p className="font-mono text-xs uppercase tracking-mono-label text-body">
                What the rules actually require
              </p>
              <p className="mt-3 text-base leading-relaxed text-body">
                Kari&apos;s Law requires multi-line telephone systems to make 911 easier to reach
                and easier to respond to internally — users must be able to dial 911 directly with
                no prefix, access code or leading digit required. RAY BAUM&apos;S Act requires 911
                calls to include accurate dispatchable location information so emergency
                responders know where to go.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 04 — What still runs on copper */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              04 — What still runs on copper
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Everything still hanging on a dial tone.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              Each of these terminates on an FXS port and rides the managed cellular path instead.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-8 border-t border-hairline sm:grid-cols-2">
              {REPLACED_ENDPOINTS.map((e) => (
                <li key={e} className="border-b border-hairline py-3 text-base leading-relaxed text-body">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* 05 — How a cutover runs */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              05 — How a cutover runs
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Five steps, and nobody loses a line.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {cutover.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-text">{n}</span>
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

    {/* 06 — Industries */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              06 — Industries
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Where we do this work.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {industries.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-text">{n}</span>
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

    {/* CTA / form */}
    <section id="quote" className="bg-navy-950">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">Line audit</span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-white">
              Get your free line audit.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-200">
              Tell us about your sites and we&apos;ll come back with a plan and pricing within one
              business day.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-lg border border-divider bg-navy-900 p-8">
              <MultiStepForm preset="pots" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PotsReplacement;
