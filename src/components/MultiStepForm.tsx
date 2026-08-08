import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Send,
  AlertCircle,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface MultiStepFormData {
  industry: string;
  company_size: string;
  pain_points: string[];
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
}

export interface MultiStepFormProps {
  /** Called after a successful submission with the form data */
  onSuccess?: (data: MultiStepFormData) => void;
  /** Pre-select a pain point (used by solution pages to seed context) */
  defaultPainPoint?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const CRM_ENDPOINT =
  'https://enhancedlines.com/api/public/forms/f042309a-4268-4d51-986d-c1a827af9dea/submit';

const STEP_LABELS = ['Industry', 'Company', 'Pain Points', 'Contact'];

const INDUSTRIES = [
  'Senior Living',
  'Hospitality',
  'Property Management',
  'Healthcare',
  'Retail & Multi-Site',
  'Other',
];

const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];

const PAIN_POINTS = [
  'Reducing telecom costs',
  'Replacing legacy copper lines',
  'Improving business continuity',
  'Adding AI/automation',
  'Modernizing voice systems',
  'Improving internet reliability',
  'Compliance requirements',
  'Other',
];

// ── Component ──────────────────────────────────────────────────────────────────

const MultiStepForm = ({ onSuccess, defaultPainPoint }: MultiStepFormProps) => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<MultiStepFormData>({
    industry: '',
    company_size: '',
    pain_points: defaultPainPoint ? [defaultPainPoint] : [],
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    message: '',
  });

  // ── Helpers ────────────────────────────────────────────────────────────────

  const update = (field: keyof MultiStepFormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance = (): boolean => {
    if (step === 0) return form.industry !== '';
    if (step === 1) return form.company_size !== '';
    if (step === 2) return form.pain_points.length > 0;
    if (step === 3) return form.company_name !== '' && form.email !== '';
    return false;
  };

  const goNext = () => {
    if (canAdvance() && step < 3) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const togglePainPoint = (point: string) => {
    setForm((prev) => {
      const exists = prev.pain_points.includes(point);
      return {
        ...prev,
        pain_points: exists
          ? prev.pain_points.filter((p) => p !== point)
          : [...prev.pain_points, point],
      };
    });
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance()) return;

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        industry: form.industry,
        company_size: form.company_size,
        pain_point: form.pain_points.join(', '),
        company_name: form.company_name,
        contact_name: form.contact_name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      };

      const res = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(body || `Request failed (${res.status})`);
      }

      setSuccess(true);
      onSuccess?.(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="rounded-2xl bg-white border border-navy-100 shadow-card p-8 sm:p-10 text-center animate-fadeInUp">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h3 className="mt-6 text-2xl font-extrabold text-navy-900">Thank you!</h3>
        <p className="mt-3 text-navy-500 max-w-md mx-auto leading-relaxed">
          Your information has been received. One of our telecom specialists will reach out within
          one business day to discuss your needs.
        </p>
      </div>
    );
  }

  // ── Step indicator ─────────────────────────────────────────────────────────

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEP_LABELS.map((label, idx) => {
        const isActive = idx === step;
        const isComplete = idx < step;
        const isPending = idx > step;

        return (
          <div key={label} className="flex items-center gap-2">
            {/* Dot */}
            <div
              className={`flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold border-2 transition-all duration-300 ${
                isComplete
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : isActive
                  ? 'border-brand-500 text-brand-600 bg-brand-50'
                  : 'border-navy-200 text-navy-400 bg-white'
              }`}
            >
              {isComplete ? (
                <CheckCircle2 size={18} />
              ) : (
                idx + 1
              )}
            </div>
            {/* Connector line (except after last) */}
            {idx < 3 && (
              <div
                className={`hidden sm:block w-8 h-0.5 rounded-full transition-colors duration-300 ${
                  isComplete ? 'bg-brand-500' : 'bg-navy-200'
                }`}
              />
            )}
          </div>
        );
      })}
      {/* Mobile labels */}
      <div className="w-full flex justify-between sm:hidden mt-2">
        {/* labels handled inline below */}
      </div>
    </div>
  );

  const stepLabel = (
    <p className="text-center text-sm font-medium text-navy-400 mb-2">
      Step {step + 1} of 4 — {STEP_LABELS[step]}
    </p>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl bg-white border border-navy-100 shadow-card p-8 sm:p-10">
      {stepLabel}
      <StepIndicator />

      {/* ── Step 0: Industry ──────────────────────────────────────────────── */}
      {step === 0 && (
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold text-navy-900 text-center">
            What industry are you in?
          </h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => {
                  update('industry', ind);
                  goNext();
                }}
                className={`text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  form.industry === ind
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-[0_0_0_1px_rgba(37,99,235,0.2)]'
                    : 'border-navy-200 bg-white text-navy-700 hover:border-brand-300 hover:bg-brand-50/50'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 1: Company Size ──────────────────────────────────────────── */}
      {step === 1 && (
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold text-navy-900 text-center">
            How many employees does your company have?
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  update('company_size', size);
                  goNext();
                }}
                className={`px-6 py-4 rounded-xl border text-base font-semibold transition-all duration-200 min-w-[100px] ${
                  form.company_size === size
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-[0_0_0_1px_rgba(37,99,235,0.2)]'
                    : 'border-navy-200 bg-white text-navy-700 hover:border-brand-300 hover:bg-brand-50/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <div />
          </div>
        </div>
      )}

      {/* ── Step 2: Pain Points ───────────────────────────────────────────── */}
      {step === 2 && (
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold text-navy-900 text-center">
            What are your primary telecom challenges?
          </h3>
          <p className="mt-1 text-sm text-navy-400 text-center">
            Select all that apply
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAIN_POINTS.map((point) => {
              const selected = form.pain_points.includes(point);
              return (
                <button
                  key={point}
                  type="button"
                  onClick={() => togglePainPoint(point)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-[0_0_0_1px_rgba(37,99,235,0.2)]'
                      : 'border-navy-200 bg-white text-navy-700 hover:border-brand-300 hover:bg-brand-50/50'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selected
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-navy-300 bg-white'
                    }`}
                  >
                    {selected && <CheckCircle2 size={12} />}
                  </span>
                  {point}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance()}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canAdvance()
                  ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-glow hover:shadow-card-hover hover:-translate-y-0.5'
                  : 'bg-navy-100 text-navy-400 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Contact ───────────────────────────────────────────────── */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-fadeIn">
          <h3 className="text-xl font-bold text-navy-900 text-center">
            How can we reach you?
          </h3>
          <p className="mt-1 text-sm text-navy-400 text-center">
            Reviewed personally by our team — no automated sales sequences. We'll follow up
            within one business day.
          </p>

          <div className="mt-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Company Name *"
                value={form.company_name}
                onChange={(v) => update('company_name', v)}
                placeholder="Acme Corp"
                required
              />
              <Field
                label="Contact Name *"
                value={form.contact_name}
                onChange={(v) => update('contact_name', v)}
                placeholder="Jane Smith"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Email *"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                placeholder="jane@acmecorp.com"
                required
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => update('phone', v)}
                placeholder="(555) 123-4567"
              />
            </div>
            <Field
              label="Message / Notes"
              value={form.message}
              onChange={(v) => update('message', v)}
              placeholder="Tell us about your project or any specific requirements..."
              textarea
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-col sm:flex-row-reverse sm:justify-between gap-3">
            <button
              type="submit"
              disabled={!canAdvance() || submitting}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canAdvance() && !submitting
                  ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-glow hover:shadow-card-hover hover:-translate-y-0.5'
                  : 'bg-navy-100 text-navy-400 cursor-not-allowed'
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <Send size={16} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          </div>
        </form>
      )}
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

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  textarea,
}: FieldProps) => {
  const inputClasses =
    'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-400';

  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-700 mb-1.5">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`${inputClasses} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
        />
      )}
    </label>
  );
};

export default MultiStepForm;
