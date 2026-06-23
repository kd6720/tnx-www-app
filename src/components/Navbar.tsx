import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Bot,
  Wifi,
  PhoneCall,
  Smartphone,
  Mic,
  Calculator,
  AlertTriangle,
  Shield,
  TrendingUp,
  Brain,
} from 'lucide-react';

const solutions = [
  { to: '/ai-workforce', label: 'AI Workforce', desc: 'AI agents for telecom', icon: Bot },
  { to: '/pots-replacement', label: 'POTS Replacement', desc: 'Modern landline alternatives', icon: Phone },
  { to: '/ai-consulting', label: 'AI Consulting & Solutions', desc: 'Practical AI automation', icon: Bot },
  { to: '/internet-connectivity', label: 'Internet Connectivity', desc: 'Enterprise-grade access', icon: Wifi },
  { to: '/mobility-solutions', label: 'Mobility Solutions', desc: 'Manage your mobile fleet', icon: Smartphone },
  { to: '/voice-solutions', label: 'Voice Solutions', desc: 'Unified voice communications', icon: Mic },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsDropdownOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsDropdownOpen(false), 140);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors ${
      isActive ? 'text-white' : 'text-navy-200 hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out-expo ${
        scrolled ? 'glass-dark shadow-lg shadow-navy-950/30' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <img
              src="/logo.svg"
              alt="TrustedNetworx logo"
              className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-extrabold tracking-tight text-white">
              Trusted<span className="text-brand-400">Networx</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>

            <div className="relative" onMouseEnter={openDropdown} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-navy-200 hover:text-white transition-colors"
                onClick={() => setIsDropdownOpen((v) => !v)}
                aria-expanded={isDropdownOpen}
              >
                Solutions
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-4 w-[34rem] rounded-2xl p-3 grid grid-cols-2 gap-1.5 bg-navy-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-navy-950/50 animate-fadeIn"
                >
                  {solutions.map(({ to, label, desc, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5 group"
                    >
                      <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-300 group-hover:bg-brand-500/25 transition-colors">
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{label}</span>
                        <span className="block text-xs text-navy-300">{desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Tools section in dropdown */}
              {isDropdownOpen && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="px-3 text-xs font-semibold uppercase tracking-widest text-navy-400">
                    Free Assessment Tools
                  </p>
                  <div className="mt-2 flex gap-1.5 px-1.5">
                    <Link
                      to="/tools/pots-roi-calculator"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Calculator size={14} className="text-brand-300" />
                      ROI Calculator
                    </Link>
                    <Link
                      to="/tools/copper-sunset-risk"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <AlertTriangle size={14} className="text-amber-400" />
                      Sunset Risk
                    </Link>
                    <Link
                      to="/tools/failover-readiness"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Shield size={14} className="text-brand-300" />
                      Failover Check
                    </Link>
                    <Link
                      to="/tools/ai-roi-calculator"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <TrendingUp size={14} className="text-cyan-400" />
                      AI ROI Calculator
                    </Link>
                    <Link
                      to="/tools/ai-readiness"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Brain size={14} className="text-accent-400" />
                      AI Readiness
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/blog" className={linkClass}>
              Blog
            </NavLink>
            <NavLink to="/tools" className={linkClass}>
              Tools
            </NavLink>

            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-brand-500 hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-950/95 backdrop-blur-xl border-t border-white/10 animate-fadeIn">
          <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link to="/" className="block rounded-lg px-3 py-2.5 text-base font-medium text-white hover:bg-white/10">
              Home
            </Link>
            <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-navy-400">
              Solutions
            </p>
            {solutions.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-100 hover:bg-white/10"
              >
                <Icon size={18} className="text-brand-300" />
                {label}
              </Link>
            ))}
            <Link
              to="/about"
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-white hover:bg-white/10 mt-1"
            >
              About
            </Link>
            <Link to="/blog" className="block rounded-lg px-3 py-2.5 text-base font-medium text-white hover:bg-white/10">
              Blog
            </Link>
            <Link to="/tools" className="block rounded-lg px-3 py-2.5 text-base font-medium text-white hover:bg-white/10">
              Free Tools
            </Link>
            <Link to="/contact" className="block rounded-lg px-3 py-2.5 text-base font-medium text-white hover:bg-white/10">
              Contact
            </Link>
            <Link
              to="/contact"
              className="mt-3 flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-glow"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
