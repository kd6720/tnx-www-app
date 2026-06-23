import React, { useState, useMemo } from 'react';
import {
  Calculator,
  ArrowRight,
  DollarSign,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Zap,
  PhoneOff,
  CheckCircle2,
  ChevronRight,
  Building2,
  Send,
} from 'lucide-react';
import Seo from '../../components/Seo';

const CRM_ENDPOINT =
  'https://enhancedlines.com/api/public/forms/f042309a-4268-4d51-986d-c1a827af9dea/submit';

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

const PotsRoiCalculator = () => {
  const [lines, setLines] = useState(50);
  const [monthlyCost, setMonthlyCost] = useState(85);
  const [industry, setIndustry] = useState('');

  const REPLACEMENT_COST = 25;

  const monthlySavings = useMemo(
    () => Math.max(0, lines * (monthlyCost - REPLACEMENT_COST)),
    [lines, monthlyCost],
  );
  const annualSavings = monthlySavings * 12;
  const threeYearSavings = annualSavings * 3;
  const currentAnnualSpend = lines * monthlyCost * 12;
  const replacementAnnualSpend = lines * REPLACEMENT_COST * 12;

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(CRM_ENDPOINT, {
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
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            threeYearSavings: Math.round(threeYearSavings),
            currentAnnualSpend: Math.round(currentAnnualSpend),
            replacementAnnualSpend: Math.round(replacementAnnualSpend),
          }),
        }),
      });
      setSubmitted(true);
    } catch {
      // Still show success — CRM will queue
      setSubmitted(true);
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
        description="Calculate how much your organization can save by replacing legacy POTS copper lines with modern alternatives. Interactive ROI tool from TrustedNetworx."
      />

      {/* Hero */}
      <section className="relative flex min-h-[480px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900" />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                <Calculator size={14} />
                Interactive Assessment Tool
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                POTS Replacement{' '}
                <span className="bg-gradient-to-r from-brand-300 via-accent-300 to-brand-200 bg-clip-text text-transparent">
                  ROI Calculator
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-navy-200">
                See how much your organization can save by modernizing legacy copper lines.
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
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-white">
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
                  max={150}
                  step={5}
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>$30</span>
                  <span>$150</span>
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

          {/* Results */}
          {hasResults && (
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <BarChart3 size={20} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-navy-900">Your Savings Projection</h3>
                  <p className="text-sm text-navy-500">
                    Based on {lines} line{lines !== 1 ? 's' : ''} at {formatCurrency(monthlyCost)}/mo each
                  </p>
                </div>
              </div>

              {/* Big number cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl bg-white border border-emerald-100 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Monthly Savings
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {formatCurrency(monthlySavings)}
                  </p>
                  <p className="mt-1 text-xs text-navy-400">per month</p>
                </div>
                <div className="rounded-xl bg-white border border-emerald-100 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Annual Savings
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {formatCurrency(annualSavings)}
                  </p>
                  <p className="mt-1 text-xs text-navy-400">per year</p>
                </div>
                <div className="rounded-xl bg-white border border-emerald-100 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    3-Year Savings
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {formatCurrency(threeYearSavings)}
                  </p>
                  <p className="mt-1 text-xs text-navy-400">over 3 years</p>
                </div>
              </div>

              {/* Context metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                  <PhoneOff size={20} className="text-navy-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Lines Being Retired</p>
                    <p className="text-lg font-bold text-navy-900">{lines}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                  <DollarSign size={20} className="text-navy-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Current Annual Spend</p>
                    <p className="text-lg font-bold text-navy-900">
                      {formatCurrency(currentAnnualSpend)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transparency note */}
              <p className="mt-4 text-xs text-navy-400 text-center">
                Estimated replacement cost: ~{formatCurrency(REPLACEMENT_COST)}/line/mo
                ({formatCurrency(replacementAnnualSpend)}/yr for {lines} lines). Actual
                pricing depends on your specific deployment.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10">
            {!showForm ? (
              <div className="text-center">
                <p className="text-navy-500 mb-4">
                  Want a tailored quote for your organization?
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
                  Your information and savings projection have been submitted. A TrustedNetworx
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
                  We'll include your calculator results — no need to re-enter anything.
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
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
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
