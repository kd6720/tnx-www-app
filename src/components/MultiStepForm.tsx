import { useState, useEffect, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Send,
  AlertCircle,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Relationship = 'msp' | 'reseller' | 'direct' | 'platform';
type Preset =
  | 'home'
  | 'pots'
  | 'ai'
  | 'voice'
  | 'connectivity'
  | 'partner-hub'
  | 'crm'
  | 'partners'
  | 'contact';

interface PresetConfig {
  button: string;
  relationships: Relationship[];
  presetNeed?: string;
  extras?: 'pots' | 'ai' | 'voice' | 'connectivity' | 'partner-hub' | 'crm' | 'partners';
  thankYou: string;
  thankYouLink?: { to: string; label: string };
}

// ── Config ────────────────────────────────────────────────────────────────────

const CRM_FORM_IDS: Record<Preset, string> = {
  home: 'f042309a-4268-4d51-986d-c1a827af9dea',
  pots: 'f042309a-4268-4d51-986d-c1a827af9dea',
  ai: 'f042309a-4268-4d51-986d-c1a827af9dea',
  voice: 'f042309a-4268-4d51-986d-c1a827af9dea',
  connectivity: 'f042309a-4268-4d51-986d-c1a827af9dea',
  'partner-hub': 'f042309a-4268-4d51-986d-c1a827af9dea',
  crm: 'f042309a-4268-4d51-986d-c1a827af9dea',
  partners: 'f042309a-4268-4d51-986d-c1a827af9dea',
  contact: 'f042309a-4268-4d51-986d-c1a827af9dea',
};

const PRESETS: Record<Preset, PresetConfig> = {
  home: {
    button: 'Get my recommendation',
    relationships: ['msp', 'reseller', 'direct', 'platform'],
    thankYou: "We'll call within one business day with your recommendation.",
  },
  pots: {
    button: 'Get a line audit',
    relationships: ['msp', 'reseller', 'direct'],
    presetNeed: 'POTS replacement',
    extras: 'pots',
    thankYou: "We'll call within one business day to scope your line audit.",
  },
  ai: {
    button: 'Book an AI readiness review',
    relationships: ['msp', 'reseller', 'direct'],
    presetNeed: 'AI agents / automation',
    extras: 'ai',
    thankYou: "We'll call within one business day to book your review.",
  },
  voice: {
    button: 'Get a voice quote',
    relationships: ['msp', 'reseller', 'direct'],
    presetNeed: 'Voice / IP PBX',
    extras: 'voice',
    thankYou: "We'll call within one business day with a voice quote.",
  },
  connectivity: {
    button: 'Check availability',
    relationships: ['msp', 'reseller', 'direct'],
    presetNeed: 'Internet connectivity',
    extras: 'connectivity',
    thankYou: "We'll call within one business day with availability.",
  },
  'partner-hub': {
    button: 'Request a demo',
    relationships: ['platform'],
    presetNeed: 'Platforms',
    extras: 'partner-hub',
    thankYou: "We'll reach out to schedule your Partner Hub demo.",
    thankYouLink: { to: 'https://tnxpartnerhub.com', label: 'Log in to Partner Hub' },
  },
  crm: {
    button: 'Start a trial',
    relationships: ['platform'],
    presetNeed: 'Platforms',
    extras: 'crm',
    thankYou: "We'll reach out to start your TNX CRM trial.",
    thankYouLink: { to: 'https://tnxcrm.com', label: 'Log in to TNX CRM' },
  },
  partners: {
    button: 'Book a partner call',
    relationships: ['msp', 'reseller'],
    extras: 'partners',
    thankYou: "We'll reach out to book your partner call.",
  },
  contact: {
    button: 'Send',
    relationships: ['msp', 'reseller', 'direct', 'platform'],
    thankYou: "We'll call within one business day.",
  },
};

const RELATIONSHIP_TILES: { value: Relationship; label: string; desc: string }[] = [
  { value: 'msp', label: "I'm an MSP", desc: 'Sell to my own clients' },
  { value: 'reseller', label: "I'm a reseller or agent", desc: 'Sell on commission' },
  { value: 'direct', label: "I'm buying for my own organization", desc: 'End customer' },
  { value: 'platform', label: "I'm interested in TNX Partner Hub or TNX CRM", desc: 'Platform buyer' },
];

const VERTICALS = [
  'Senior Living',
  'Hospitality',
  'Healthcare',
  'Property Management / Multi-family',
  'Retail & Multi-site',
  'Education',
  'Government / Municipal',
  'Auto Dealership',
  'Construction / Jobsites',
  'Fire, Alarm & Security Integrator',
  'Other',
];

const SELL_TODAY = ['Managed IT', 'Voice / UCaaS', 'Connectivity', 'Security / Alarm', 'Not selling telecom yet'];

const CUSTOMER_COUNTS = ['<25', '25–100', '100–500', '500+'];

const NEEDS = [
  'AI agents / automation',
  'POTS replacement',
  'Voice / IP PBX',
  'Internet connectivity',
  'Mobility',
  'Business continuity / failover',
  'Not sure — audit me',
];

const POTS_DEVICES = ['Fire alarm', 'Elevator phone', 'Emergency phone', 'Fax', 'Gate / entry system'];

const TEAM_SIZES = ['1–5', '6–20', '21–100', '100+'];

export interface MultiStepFormProps {
  preset?: Preset;
  defaultPainPoint?: string;
  onSuccess?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

const MultiStepForm = ({ preset = 'home', defaultPainPoint, onSuccess }: MultiStepFormProps) => {
  const config = PRESETS[preset];
  const singleRel = config.relationships.length === 1 ? config.relationships[0] : null;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [relationship, setRelationship] = useState<Relationship | null>(singleRel);
  const [vertical, setVertical] = useState('');
  const [sellToday, setSellToday] = useState<string[]>([]);
  const [customerCount, setCustomerCount] = useState('');
  const [platformChoice, setPlatformChoice] = useState('');
  const [needs, setNeeds] = useState<string[]>(config.presetNeed ? [config.presetNeed] : defaultPainPoint ? [defaultPainPoint] : []);
  const [potsDevices, setPotsDevices] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState('');
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', notes: '' });
  const [sites, setSites] = useState('');
  const [lines, setLines] = useState('');

  const showRelationship = config.relationships.length > 1;
  const showNeed = !config.presetNeed && relationship !== 'platform';
  const phoneRequired = relationship === 'direct' || relationship === 'msp' || relationship === 'reseller';
  const visibleSteps = [
    ...(showRelationship ? ['relationship'] : []),
    'context',
    ...(showNeed ? ['need'] : []),
    'contact',
  ];
  const totalSteps = visibleSteps.length;

  // sessionStorage persistence (relationship + step + contact)
  useEffect(() => {
    const key = `tnx-form:${preset}`;
    try {
      const saved = sessionStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.relationship) setRelationship(parsed.relationship);
        if (parsed.contact) setContact((c: typeof contact) => ({ ...c, ...parsed.contact }));
      }
    } catch {
      /* ignore */
    }
    return () => {
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({ relationship, contact }),
        );
      } catch {
        /* ignore */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  const update = (field: keyof typeof contact, value: string) =>
    setContact((prev) => ({ ...prev, [field]: value }));

  const toggle = (list: string[], value: string, setter: (v: string[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const canAdvance = (): boolean => {
    const current = visibleSteps[step];
    if (current === 'relationship') return relationship !== null;
    if (current === 'context') {
      if (relationship === 'direct') return vertical !== '';
      if (relationship === 'platform') return platformChoice !== '';
      return true;
    }
    if (current === 'need') return needs.length > 0;
    return true;
  };

  const goNext = () => {
    if (canAdvance() && step < totalSteps - 1) setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        // legacy keys — the existing CRM public form maps by these
        contact_name: contact.name,
        company_name: contact.company,
        message: contact.notes,
        industry: vertical,
        pain_point: needs.join(', '),
        // new keys — for the per-preset form-ids Carter will create
        source_page: typeof window !== 'undefined' ? window.location.pathname : '',
        preset,
        relationship,
        vertical,
        sell_today: sellToday.join(', '),
        customer_count: customerCount,
        platform: platformChoice,
        needs: needs.join(', '),
        pots_devices: potsDevices.join(', '),
        team_size: teamSize,
        sites,
        lines,
        ...contact,
      };
      const res = await fetch(
        `https://enhancedlines.com/api/public/forms/${CRM_FORM_IDS[preset]}/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      window.dispatchEvent(new CustomEvent('form_submit', { detail: { preset } }));
      sessionStorage.removeItem(`tnx-form:${preset}`);
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-white border border-navy-100 shadow-card p-8 sm:p-10 text-center animate-fadeInUp">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h3 className="mt-6 text-2xl font-extrabold text-navy-900">Thank you!</h3>
        <p className="mt-3 text-navy-500 max-w-md mx-auto leading-relaxed">{config.thankYou}</p>
        {config.thankYouLink && (
          <a
            href={config.thankYouLink.to}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {config.thankYouLink.label}
            <ArrowRight size={16} />
          </a>
        )}
      </div>
    );
  }

  const current = visibleSteps[step];

  const stepLabel = (
    <div
      className="mb-4 h-0.5 w-full overflow-hidden rounded-full bg-navy-100"
      role="progressbar"
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${step + 1} of ${totalSteps}`}
    >
      <div
        className="h-full bg-brand-600 transition-all duration-300"
        style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
      />
    </div>
  );

  const navButtons = (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
      >
        <ChevronLeft size={16} />
        Back
      </button>
      {step < totalSteps - 1 && (
        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance()}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            canAdvance()
              ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-glow hover:shadow-card-hover hover:-translate-y-0.5'
              : 'bg-navy-100 text-navy-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );

  const tileClass = (selected: boolean) =>
    `text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
      selected
        ? 'border-brand-500 bg-brand-50 text-brand-700'
        : 'border-navy-200 bg-white text-navy-700 hover:border-brand-300 hover:bg-brand-50/50'
    }`;

  return (
    <div className="rounded-2xl bg-white border border-navy-100 shadow-card p-8 sm:p-10">
      {stepLabel}
      <div aria-live="polite">
        {/* Relationship */}
        {current === 'relationship' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-navy-900 text-center">How do you work with us?</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RELATIONSHIP_TILES.filter((r) => config.relationships.includes(r.value)).map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => {
                    setRelationship(r.value);
                    goNext();
                  }}
                  className={tileClass(relationship === r.value)}
                >
                  <span className="block font-semibold">{r.label}</span>
                  <span className="block text-xs text-navy-500 mt-0.5">{r.desc}</span>
                </button>
              ))}
            </div>
            {navButtons}
          </div>
        )}

        {/* Context — depends on relationship */}
        {current === 'context' && (
          <div className="animate-fadeIn">
            {relationship === 'direct' && (
              <>
                <h3 className="text-xl font-bold text-navy-900 text-center">What kind of organization?</h3>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VERTICALS.map((v) => (
                    <button key={v} type="button" onClick={() => { setVertical(v); goNext(); }} className={tileClass(vertical === v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </>
            )}
            {relationship === 'platform' && (
              <>
                <h3 className="text-xl font-bold text-navy-900 text-center">Which platform?</h3>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {['TNX Partner Hub (AI Agent Management)', 'TNX CRM', 'Both'].map((p) => (
                    <button key={p} type="button" onClick={() => { setPlatformChoice(p); goNext(); }} className={tileClass(platformChoice === p)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            )}
            {(relationship === 'msp' || relationship === 'reseller') && (
              <>
                <h3 className="text-xl font-bold text-navy-900 text-center">What do you sell today?</h3>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SELL_TODAY.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(sellToday, s, setSellToday)}
                      className={tileClass(sellToday.includes(s))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-sm font-medium text-navy-700 text-center">Roughly how many customers or sites?</p>
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  {CUSTOMER_COUNTS.map((c) => (
                    <button key={c} type="button" onClick={() => { setCustomerCount(c); goNext(); }} className={tileClass(customerCount === c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
            {navButtons}
          </div>
        )}

        {/* Need */}
        {current === 'need' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-navy-900 text-center">What do you need?</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NEEDS.map((n) => (
                <button key={n} type="button" onClick={() => toggle(needs, n, setNeeds)} className={tileClass(needs.includes(n))}>
                  {n}
                </button>
              ))}
            </div>
            {navButtons}
          </div>
        )}

        {/* Contact */}
        {current === 'contact' && (
          <form onSubmit={handleSubmit} className="animate-fadeIn">
            <h3 className="text-xl font-bold text-navy-900 text-center">How can we reach you?</h3>
            <p className="mt-1 text-sm text-navy-500 text-center">
              You'll hear from Carter's team within one business day.
            </p>
            <div className="mt-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name *" value={contact.name} onChange={(v) => update('name', v)} placeholder="Jane Smith" required />
                <Field label="Company *" value={contact.company} onChange={(v) => update('company', v)} placeholder="Acme Corp" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Work email *" type="email" value={contact.email} onChange={(v) => update('email', v)} placeholder="jane@acmecorp.com" required />
                <Field label={phoneRequired ? 'Phone *' : 'Phone'} type="tel" value={contact.phone} onChange={(v) => update('phone', v)} placeholder="(555) 123-4567" required={phoneRequired} />
              </div>

              {config.extras === 'pots' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Number of lines" value={lines} onChange={setLines} placeholder="e.g. 40" />
                    <Field label="Number of sites" value={sites} onChange={setSites} placeholder="e.g. 6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-700 mb-2">Which devices are on POTS lines?</p>
                    <div className="flex flex-wrap gap-2">
                      {POTS_DEVICES.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggle(potsDevices, d, setPotsDevices)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                            potsDevices.includes(d) ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-navy-200 text-navy-700 hover:border-brand-300'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {config.extras === 'connectivity' && (
                <Field label="Number of sites" value={sites} onChange={setSites} placeholder="e.g. 12" />
              )}
              {config.extras === 'ai' && (
                <Field label="Which workflows?" value={contact.notes} onChange={(v) => update('notes', v)} placeholder="Inbound quoting, scheduling, lead qualification, support, email triage…" textarea />
              )}
              {config.extras === 'voice' && (
                <Field label="Seats / current system" value={contact.notes} onChange={(v) => update('notes', v)} placeholder="e.g. 200 seats, on-prem PBX" />
              )}
              {config.extras === 'partner-hub' && (
                <>
                  <div>
                    <p className="text-sm font-medium text-navy-700 mb-2">Team size</p>
                    <div className="flex flex-wrap gap-2">
                      {TEAM_SIZES.map((t) => (
                        <button key={t} type="button" onClick={() => setTeamSize(t)} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${teamSize === t ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-navy-200 text-navy-700 hover:border-brand-300'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="How many agents do you run or plan to run?" value={contact.notes} onChange={(v) => update('notes', v)} placeholder="e.g. 5–10" />
                </>
              )}
              {config.extras === 'crm' && (
                <>
                  <div>
                    <p className="text-sm font-medium text-navy-700 mb-2">Team size</p>
                    <div className="flex flex-wrap gap-2">
                      {TEAM_SIZES.map((t) => (
                        <button key={t} type="button" onClick={() => setTeamSize(t)} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${teamSize === t ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-navy-200 text-navy-700 hover:border-brand-300'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Current CRM" value={contact.notes} onChange={(v) => update('notes', v)} placeholder="HubSpot / Pipedrive / none" />
                </>
              )}
              {config.extras === 'partners' && (
                <Field label="White-label interest?" value={contact.notes} onChange={(v) => update('notes', v)} placeholder="Yes / No" />
              )}

              {!config.extras && (
                <>
                  <Field label="Number of sites" value={sites} onChange={setSites} placeholder="e.g. 6" />
                  <Field label="Anything else?" value={contact.notes} onChange={(v) => update('notes', v)} placeholder="Tell us about your project or requirements…" textarea />
                </>
              )}
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-7 flex flex-col sm:flex-row-reverse sm:justify-between gap-3">
              <button
                type="submit"
                disabled={submitting || !contact.name || !contact.email || (phoneRequired && !contact.phone)}
                className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  !submitting && contact.name && contact.email && (!phoneRequired || contact.phone)
                    ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-glow hover:shadow-card-hover hover:-translate-y-0.5'
                    : 'bg-navy-100 text-navy-400 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    {config.button}
                    <Send size={16} />
                  </>
                )}
              </button>
              <button type="button" onClick={goBack} className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors">
                <ChevronLeft size={16} />
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ── Reusable field ─────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}

const Field = ({ label, value, onChange, placeholder, type = 'text', required, textarea }: FieldProps) => {
  const inputClasses =
    'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-400';
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-700 mb-1.5">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} rows={3} className={`${inputClasses} resize-y`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className={inputClasses} />
      )}
    </label>
  );
};

export default MultiStepForm;
