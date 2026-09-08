import React, { useState, useMemo } from 'react';
import {
  Calculator,
  ArrowRight,
  DollarSign,
  BarChart3,
  PhoneOff,
  CheckCircle2,
  Send,
  Info,
} from 'lucide-react';
import Seo from '../../components/Seo';

const CRM_ENDPOINT = '/.netlify/functions/lead';

const INDUSTRIES = [
  'Property Management',
  'Senior Living',
  'Hospitality',
  'Healthcare',
  'Education',
  'Government',
  'Retail',
  'Manufacturing',
  'Financial Services',
  'Other',
];

// Scenario modeling only. TrustedNetworx publishes no per-line replacement
// price on this page. The reduction percentage is supplied by the reader and
// is explicitly labelled as their assumption, not a quote. Do not reintroduce
// a hardcoded replacement cost, savings percentage, or default scenario value
// without an approved, sourced figure.
const BAND_SPREAD = 10;
const BAND_FLOOR = 5;
const BAND_CEILING = 75;

const PotsRoiCalculator = () => {
  const [lines, setLines] = useState(50);
  const [monthlyCost, setMonthlyCost] = useState(85);
  const [industry, setIndustry] = useState('');
  const [reductionPct, setReductionPct] = useState(0);

  const currentMonthlySpend = useMemo(() => lines * monthlyCost, [lines, monthlyCost]);
  const currentAnnualSpend = currentMonthlySpend * 12;
  const currentThreeYearSpend = currentAnnualSpend * 3;

  const band = useMemo(() => {
    if (reductionPct <= 0) return null;
    const low = Math.max(BAND_FLOOR, reductionPct - BAND_SPREAD);
    const high = Math.min(BAND_CEILING, reductionPct + BAND_SPREAD);
    const at = (pct: number) => ({
      pct,
      monthly: currentMonthlySpend * (pct / 100),
      annual: currentAnnualSpend * (pct / 100),
      threeYear: currentThreeYearSpend * (pct / 100),
    });
    return { low: at(low), mid: at(reductionPct), high: at(high) };
  }, [reductionPct, currentMonthlySpend, currentAnnualSpend, currentThreeYearSpend]);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          source: 'POTS ROI Calculator',
          calculator_results: JSON.stringify({
            lines,
            monthlyCost,
            industry,
            currentMonthlySpend: Math.round(currentMonthlySpend),
            currentAnnualSpend: Math.round(currentAnnualSpend),
            currentThreeYearSpend: Math.round(currentThreeYearSpend),
            scenarioReductionPct: reductionPct,
            scenarioAnnualSavings: band ? Math.round(band.mid.annual) : null,
          }),
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't send that just now. Please try again, or email sales@trustednetworx.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  const hasResults = lines > 0 && monthlyCost > 0;

  return (
    <div className="bg-navy-50">
      <Seo
        title="POTS Replacement ROI Calculator | TrustedNetworx"
        description="Size what your legacy POTS copper lines cost you today and model what a per-line cost reduction is worth. Interactive planning tool from TrustedNetworx."
      />

      {/* Hero */}
      <section className="relative flex min-h-[480px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900" />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                <Calculator size={14} />
                Interactive Assessment Tool
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                {'POTS Replacement '}
                <span className="text-brand-300">
                  ROI Calculator
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-navy-200">
                Start with what copper costs you today. Then model what a reduction is worth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Inputs */}
          <div className="glass-morphism rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-600 text-white">
                <Calculator size={20} />
              </span>
              Configure Your Scenario
            </h2>
            <p className="mt-2 text-navy-500">Adjust the sliders to match your organization's current setup.</p>

            <div className="mt-8 space-y-8">
              {/* Lines slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Number of POTS Lines
                  </label>
                  <span className="text-2xl font-extrabold text-brand-600">{lines}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={1000}
                  value={lines}
                  onChange={(e) => setLines(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>1</span>
                  <span>1,000</span>
                </div>
              </div>

              {/* Monthly cost slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Avg Monthly Cost per Line
                  </label>
                  <span className="text-2xl font-extrabold text-brand-600">
                    {formatCurrency(monthlyCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={500}
                  step={5}
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>$30</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Industry dropdown */}
              <div>
                <label className="block text-sm font-semibold text-navy-800 mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Current spend */}
          {hasResults && (
            <div className="mt-8 rounded-2xl bg-white border border-navy-200 p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-white">
                  <DollarSign size={20} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-navy-900">What Copper Costs You Today</h3>
                  <p className="text-sm text-navy-500">
                    {`Your figures: ${lines} line${lines !== 1 ? 's' : ''} at ${formatCurrency(monthlyCost)}/mo each`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Monthly
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    {formatCurrency(currentMonthlySpend)}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Annual
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    {formatCurrency(currentAnnualSpend)}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Over 3 Years
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    {formatCurrency(currentThreeYearSpend)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-navy-50 border border-navy-100 p-4 flex items-center gap-3">
                <PhoneOff size={20} className="text-navy-400 flex-shrink-0" />
                <p className="text-sm text-navy-600">
                  {`That is the run rate on ${lines} line${lines !== 1 ? 's' : ''} that the copper network is being retired out from under.`}
                </p>
              </div>
            </div>
          )}

          {/* Scenario band */}
          {hasResults && (
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <BarChart3 size={20} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-navy-900">Model a Reduction</h3>
                  <p className="text-sm text-navy-500">
                    Move the slider to see what a given per-line cost reduction is worth against your spend.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Per-line cost reduction to model
                  </label>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {reductionPct > 0 ? `${reductionPct}%` : '—'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={BAND_CEILING}
                  step={5}
                  value={reductionPct}
                  onChange={(e) => setReductionPct(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>0%</span>
                  <span>{`${BAND_CEILING}%`}</span>
                </div>
              </div>

              {band ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white/70 border border-emerald-100 p-6 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                        {`At ${band.low.pct}%`}
                      </p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-navy-700">
                        {formatCurrency(band.low.annual)}
                      </p>
                      <p className="mt-1 text-xs text-navy-400">per year</p>
                    </div>
                    <div className="rounded-xl bg-white border-2 border-emerald-300 p-6 text-center shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                        {`At ${band.mid.pct}%`}
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                        {formatCurrency(band.mid.annual)}
                      </p>
                      <p className="mt-1 text-xs text-navy-400">per year</p>
                    </div>
                    <div className="rounded-xl bg-white/70 border border-emerald-100 p-6 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                        {`At ${band.high.pct}%`}
                      </p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-navy-700">
                        {formatCurrency(band.high.annual)}
                      </p>
                      <p className="mt-1 text-xs text-navy-400">per year</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white/60 border border-navy-100 p-4 text-center">
                      <p className="text-xs text-navy-400">{`Monthly at ${band.mid.pct}%`}</p>
                      <p className="text-lg font-bold text-navy-900">
                        {formatCurrency(band.mid.monthly)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/60 border border-navy-100 p-4 text-center">
                      <p className="text-xs text-navy-400">{`Over 3 years at ${band.mid.pct}%`}</p>
                      <p className="text-lg font-bold text-navy-900">
                        {formatCurrency(band.mid.threeYear)}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl bg-white/70 border border-emerald-100 p-8 text-center">
                  <p className="text-navy-500">
                    Move the slider above to model a reduction against your current spend.
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-xl bg-white/70 border border-navy-100 p-4 flex items-start gap-3">
                <Info size={18} className="text-navy-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy-800">This is a model, not a quote.</p>
                  <p className="text-sm text-navy-600">
                    The reduction percentage is the one you selected. We do not publish a per-line
                    replacement price, because the real number depends on line type, site count,
                    circuit availability, and what each line is actually doing — a fire alarm or
                    elevator line is not priced like a back-office fax line. Send us your figures
                    and we will price your specific deployment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10">
            {!showForm ? (
              <div className="text-center">
                <p className="text-navy-500 mb-4">
                  Want your actual numbers instead of a model?
                </p>
                <button onClick={() => setShowForm(true)} className="btn-primary">
                  Get a Custom Quote
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
                <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-navy-900">Thank You!</h3>
                <p className="mt-2 text-navy-600">
                  Your information and current-spend figures have been submitted. A TrustedNetworx
                  specialist will reach out within one business day.
                </p>
              </div>
            ) : (
              <div className="surface-card p-6 sm:p-10">
                <h3 className="text-xl font-extrabold text-navy-900 flex items-center gap-2">
                  <Send size={20} className="text-brand-500" />
                  Get Your Custom Quote
                </h3>
                <p className="mt-1 text-sm text-navy-500">
                  We'll include the figures you entered — no need to re-enter anything.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Phone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Company *
                      </label>
                      <input
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>
                  {submitError && (
                    <p role="alert" className="mb-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {submitting ? 'Submitting...' : 'Submit & Get Your Quote'}
                    {!submitting && <ArrowRight size={18} />}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-cyan-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            <span className="block">Ready to start saving?</span>
            <span className="block text-brand-100">Let's build your POTS migration plan.</span>
          </h2>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <button onClick={() => setShowForm(true)} className="btn-light">
              Get a Custom Quote
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PotsRoiCalculator;
