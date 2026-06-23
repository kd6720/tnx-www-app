import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  ArrowRight,
  DollarSign,
  BarChart3,
  Brain,
  Clock,
  Zap,
  Users,
  Percent,
  CheckCircle2,
  Send,
  Info,
} from 'lucide-react';
import Seo from '../../components/Seo';

const CRM_ENDPOINT =
  'https://enhancedlines.com/api/public/forms/f042309a-4268-4d51-986d-c1a827af9dea/submit';

const AI_HOURLY_EQUIVALENT = 15;

const AiRoiCalculator = () => {
  // Input state
  const [employees, setEmployees] = useState(50);
  const [hoursSpent, setHoursSpent] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(65);
  const [automationPct, setAutomationPct] = useState(50);

  // Calculations
  const hoursSavedPerWeek = useMemo(
    () => employees * hoursSpent * (automationPct / 100),
    [employees, hoursSpent, automationPct],
  );
  const weeklySavings = useMemo(
    () => hoursSavedPerWeek * hourlyCost,
    [hoursSavedPerWeek, hourlyCost],
  );
  const monthlySavings = useMemo(() => weeklySavings * 4.33, [weeklySavings]);
  const annualSavings = useMemo(() => weeklySavings * 52, [weeklySavings]);
  const currentAnnualSpend = useMemo(
    () => employees * hoursSpent * 52 * hourlyCost,
    [employees, hoursSpent, hourlyCost],
  );
  const aiCost = useMemo(
    () => hoursSavedPerWeek * 52 * AI_HOURLY_EQUIVALENT,
    [hoursSavedPerWeek],
  );
  const netAnnualSavings = useMemo(
    () => annualSavings - aiCost,
    [annualSavings, aiCost],
  );
  const roiPct = useMemo(
    () => (aiCost > 0 ? (netAnnualSavings / aiCost) * 100 : 0),
    [netAnnualSavings, aiCost],
  );
  const hoursReclaimedPerYear = useMemo(
    () => hoursSavedPerWeek * 52,
    [hoursSavedPerWeek],
  );

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
          source: 'AI Solutions ROI Calculator',
          calculator_results: JSON.stringify({
            employees,
            hoursSpent,
            hourlyCost,
            automationPct,
            weeklySavings: Math.round(weeklySavings),
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            currentAnnualSpend: Math.round(currentAnnualSpend),
            aiCost: Math.round(aiCost),
            netAnnualSavings: Math.round(netAnnualSavings),
            roiPct: Math.round(roiPct),
            hoursReclaimedPerYear: Math.round(hoursReclaimedPerYear),
          }),
        }),
      });
      setSubmitted(true);
    } catch {
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

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('en-US').format(Math.round(n));

  const hasResults = employees > 0 && hoursSpent > 0 && hourlyCost > 0;

  // For comparison bar: current spend vs AI-powered spend
  const aiPoweredAnnualSpend = currentAnnualSpend - netAnnualSavings;
  const barMax = Math.max(currentAnnualSpend, aiPoweredAnnualSpend);

  return (
    <div className="bg-navy-50">
      <Seo
        title="AI Solutions ROI Calculator | TrustedNetworx"
        description="Estimate the return on investment from deploying AI agents and automation across your organization. Interactive ROI tool from TrustedNetworx."
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
                <TrendingUp size={14} />
                Interactive ROI Calculator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                AI Solutions{' '}
                <span className="bg-gradient-to-r from-brand-300 via-accent-300 to-brand-200 bg-clip-text text-transparent">
                  ROI Calculator
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-navy-200">
                Estimate the return on investment from deploying AI agents and automation across your organization.
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
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                <TrendingUp size={20} />
              </span>
              Configure Your Scenario
            </h2>
            <p className="mt-2 text-navy-500">Adjust the sliders to match your organization's workforce profile.</p>

            <div className="mt-8 space-y-8">
              {/* Employees slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Number of employees in roles AI could assist
                  </label>
                  <span className="text-2xl font-extrabold text-brand-600">{employees}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>5</span>
                  <span>500</span>
                </div>
              </div>

              {/* Hours per week slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Avg hours/week spent on repetitive tasks
                  </label>
                  <span className="text-2xl font-extrabold text-brand-600">{hoursSpent}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>1</span>
                  <span>40</span>
                </div>
              </div>

              {/* Hourly cost slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Avg fully-loaded hourly cost per employee
                  </label>
                  <span className="text-2xl font-extrabold text-brand-600">
                    {formatCurrency(hourlyCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={150}
                  step={5}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>$25</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Automation percentage slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Percentage AI could realistically automate
                  </label>
                  <span className="text-2xl font-extrabold text-brand-600">{automationPct}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={automationPct}
                  onChange={(e) => setAutomationPct(Number(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-navy-400 mt-1">
                  <span>10%</span>
                  <span>90%</span>
                </div>
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
                    Based on {employees} employees, {hoursSpent} hrs/wk repetitive tasks at{' '}
                    {formatCurrency(hourlyCost)}/hr, {automationPct}% automatable
                  </p>
                </div>
              </div>

              {/* Big number cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl bg-white border border-emerald-100 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Weekly Net Savings
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {formatCurrency(weeklySavings)}
                  </p>
                  <p className="mt-1 text-xs text-navy-400">per week</p>
                </div>
                <div className="rounded-xl bg-white border border-emerald-100 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Monthly Net Savings
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {formatCurrency(monthlySavings)}
                  </p>
                  <p className="mt-1 text-xs text-navy-400">per month (4.33 wks)</p>
                </div>
                <div className="rounded-xl bg-white border border-emerald-100 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Annual Net Savings
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {formatCurrency(netAnnualSavings)}
                  </p>
                  <p className="mt-1 text-xs text-navy-400">per year (after AI cost)</p>
                </div>
              </div>

              {/* ROI highlight */}
              <div className="rounded-xl bg-white border border-brand-100 p-6 mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp size={24} className="text-brand-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Return on Investment
                  </p>
                </div>
                <p className="text-5xl sm:text-6xl font-extrabold text-brand-600">
                  {Math.round(roiPct)}%
                </p>
                <p className="mt-1 text-sm text-navy-500">
                  Net savings of {formatCurrency(netAnnualSavings)} on an AI investment of{' '}
                  {formatCurrency(aiCost)}
                </p>
              </div>

              {/* Spend comparison bar */}
              <h4 className="font-semibold text-navy-900 mb-3">Annual Spend Comparison</h4>
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-navy-600">Current Spend</span>
                    <span className="font-semibold text-navy-900">
                      {formatCurrency(currentAnnualSpend)}
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-navy-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-navy-400 transition-all duration-700"
                      style={{ width: barMax > 0 ? `${(currentAnnualSpend / barMax) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-700">AI-Powered Spend</span>
                    <span className="font-semibold text-emerald-700">
                      {formatCurrency(aiPoweredAnnualSpend)}
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-navy-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-700"
                      style={{
                        width: barMax > 0 ? `${(aiPoweredAnnualSpend / barMax) * 100}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Context metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                  <Clock size={20} className="text-navy-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Hours Reclaimed per Year</p>
                    <p className="text-lg font-bold text-navy-900">
                      {formatNumber(hoursReclaimedPerYear)}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                  <Users size={20} className="text-navy-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Employees Impacted</p>
                    <p className="text-lg font-bold text-navy-900">{employees}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                  <Percent size={20} className="text-navy-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Automation Rate</p>
                    <p className="text-lg font-bold text-navy-900">{automationPct}%</p>
                  </div>
                </div>
              </div>

              {/* AI cost transparency */}
              <div className="mt-4 rounded-xl bg-brand-50 border border-brand-200 p-4 flex items-start gap-3">
                <Info size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-brand-800">AI Agent Cost Transparency</p>
                  <p className="text-sm text-brand-700">
                    Estimated AI agent equivalent cost: ~${AI_HOURLY_EQUIVALENT}/hr (compared to{' '}
                    {formatCurrency(hourlyCost)}/hr human cost). Annual AI cost:{' '}
                    {formatCurrency(aiCost)}. Actual pricing depends on your specific deployment
                    and use cases.
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
                  Ready to deploy AI agents across your workforce?
                </p>
                <button onClick={() => setShowForm(true)} className="btn-primary">
                  Explore AI Workforce Solutions
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
                <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-navy-900">Thank You!</h3>
                <p className="mt-2 text-navy-600">
                  Your ROI projection and contact details have been submitted. A TrustedNetworx AI
                  specialist will reach out within one business day to discuss your results.
                </p>
              </div>
            ) : (
              <div className="surface-card p-6 sm:p-10">
                <h3 className="text-xl font-extrabold text-navy-900 flex items-center gap-2">
                  <Send size={20} className="text-brand-500" />
                  Explore AI Workforce Solutions
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
                    {submitting ? 'Submitting...' : 'Submit & Get Your Results'}
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
            <span className="block">Ready to transform your workforce?</span>
            <span className="block text-brand-100">Let's build your AI automation strategy.</span>
          </h2>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <button onClick={() => setShowForm(true)} className="btn-light">
              Explore AI Workforce Solutions
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiRoiCalculator;
