import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export interface StickyCTAProps {
  /** Phone number override (defaults to (844) 415-6505) */
  phoneNumber?: string;
  /** Link path for "Get a Quote" button (defaults to /contact) */
  quotePath?: string;
}

const StickyCTA = ({
  phoneNumber = '(844) 415-6505',
  quotePath = '/contact',
}: StickyCTAProps) => {
  const telHref = `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-navy-100 shadow-[0_-4px_24px_rgba(16,31,61,0.08)]">
      <div className="flex items-stretch h-14 px-3 gap-2.5">
        {/* Call button */}
        <a
          href={telHref}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl my-1.5 border border-brand-300 bg-white text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 active:bg-brand-100"
        >
          <Phone size={16} />
          Call {phoneNumber}
        </a>

        {/* Quote button */}
        <Link
          to={quotePath}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl my-1.5 bg-gradient-to-r from-brand-600 to-accent-600 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:shadow-card-hover active:scale-[0.98]"
        >
          Get a Quote
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default StickyCTA;
