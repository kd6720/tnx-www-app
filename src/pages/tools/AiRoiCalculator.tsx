import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  ArrowRight,
  DollarSign,
  BarChart3,
  Clock,
  Users,
  Percent,
  Info,
} from 'lucide-react';
import Seo from '../../components/Seo';
import MultiStepForm from '../../components/MultiStepForm';

/**
 * Scenario modeling only.
 *
 * This page previously hardcoded AI_HOURLY_EQUIVALENT = 15 and published it as
 * "Estimated AI agent equivalent cost: ~$15/hr". That is a price statement, it
 * was never sourced or approved, and it was the denominator behind a headline
 * ROI percentage that ran into the hundreds at the default inputs — the kind of
 * number a serious buyer discounts on sight.
 *
 * What the page asserts now: nothing. The cost panel is arithmetic on the
 * reader's own four inputs. The automation rate is the reader's assumption and
 * is labelled as such. There is no TrustedNetworx price, no ROI multiple, and
 * no default scenario value anywhere on the page.
 *
 * Do not reintroduce a per-hour agent cost, an ROI percentage, a payback
 * period, or a default automation rate without an approved, sourced figure.
 * See src/pages/tools/PotsRoiCalculator.tsx, which carries the same constraint.
 */
const BAND_SPREAD = 10;
const BAND_FLOOR = 5;
const BAND_CEILING = 90;

const AiRoiCalculator = () => {
  // Input state — all four supplied by the reader.
  const [employees, setEmployees] = useState(50);
  const [hoursSpent, setHoursSpent] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(65);
  const [automationPct, setAutomationPct] = useState(0);

  // What the repetitive-task time costs today. Reader's figures only.
  const weeklyHours = useMemo(() => employees * hoursSpent, [employees, hoursSpent]);
  const annualHours = weeklyHours * 52;
  const weeklyCost = weeklyHours * hourlyCost;
  const annualCost = annualHours * hourlyCost;

  const band = useMemo(() => {
    if (automationPct <= 0) return null;
    const low = Math.max(BAND_FLOOR, automationPct - BAND_SPREAD);
    const high = Math.min(BAND_CEILING, automationPct + BAND_SPREAD);
    const at = (pct: number) => ({
      pct,
      hours: annualHours * (pct / 100),
      weekly: weeklyCost * (pct / 100),
      annual: annualCost * (pct / 100),
    });
    return { low: at(low), mid: at(automationPct), high: at(high) };
  }, [automationPct, annualHours, weeklyCost, annualCost]);

  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="bg-navy-50">
      <Seo
        title="AI Automation ROI Calculator | TrustedNetworx"
        description="Size what repetitive manual work costs your organization each year, then model what automating a share of it would be worth. Planning tool from TrustedNetworx."
      />

      {/* Hero */}
      <section className="relative flex min-h-[480px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900" />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                <TrendingUp size={14} />
                Interactive ROI Calculator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                {'AI Automation '}
                <span className="text-brand-300">
                  ROI Calculator
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-navy-200">
                Start with what repetitive work costs you today. Then model what automating part of it is worth.
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
            </div>
          </div>

          {/* Current cost */}
          {hasResults && (
            <div className="mt-8 rounded-2xl bg-white border border-navy-200 p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-white">
                  <DollarSign size={20} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-navy-900">What This Work Costs You Today</h3>
                  <p className="text-sm text-navy-500">
                    {`Your figures: ${employees} people, ${hoursSpent} hrs/wk each on repetitive tasks, at ${formatCurrency(hourlyCost)}/hr fully loaded`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Hours per Year
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    {formatNumber(annualHours)}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Cost per Week
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    {formatCurrency(weeklyCost)}
                  </p>
                </div>
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">
                    Cost per Year
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    {formatCurrency(annualCost)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-navy-50 border border-navy-100 p-4 flex items-center gap-3">
                <Clock size={20} className="text-navy-400 flex-shrink-0" />
                <p className="text-sm text-navy-600">
                  {`That is ${formatNumber(annualHours)} hours a year your team spends on work it did not hire those people to do.`}
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
                  <h3 className="text-xl font-extrabold text-navy-900">Model an Automation Rate</h3>
                  <p className="text-sm text-navy-500">
                    Move the slider to see what automating a share of that work would be worth.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-navy-800">
                    Share of this work to model as automated
                  </label>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {automationPct > 0 ? `${automationPct}%` : '—'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={BAND_CEILING}
                  step={5}
                  value={automationPct}
                  onChange={(e) => setAutomationPct(Number(e.target.value))}
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

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                      <Clock size={20} className="text-navy-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-navy-400">Hours reclaimed per year</p>
                        <p className="text-lg font-bold text-navy-900">
                          {formatNumber(band.mid.hours)}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                      <Users size={20} className="text-navy-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-navy-400">Employees in scope</p>
                        <p className="text-lg font-bold text-navy-900">{employees}</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/60 border border-navy-100 p-4 flex items-center gap-3">
                      <Percent size={20} className="text-navy-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-navy-400">Weekly value at this rate</p>
                        <p className="text-lg font-bold text-navy-900">
                          {formatCurrency(band.mid.weekly)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl bg-white/70 border border-emerald-100 p-8 text-center">
                  <p className="text-navy-500">
                    Move the slider above to model an automation rate against your current cost.
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-xl bg-white/70 border border-navy-100 p-4 flex items-start gap-3">
                <Info size={18} className="text-navy-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy-800">This is a model, not a quote.</p>
                  <p className="text-sm text-navy-600">
                    The automation rate is the one you selected, and the figures above are the
                    gross value of the time it represents — not net of what the agents cost to
                    build and run. We do not publish a per-agent or per-hour price here, because
                    the real number depends on task volume, how many systems the agent has to
                    touch, and how clean the underlying data is. Tell us which workflow you have
                    in mind and we will scope that one.
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
                  Explore AI Workforce Solutions
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <MultiStepForm preset="ai" />
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-cyan-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
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
