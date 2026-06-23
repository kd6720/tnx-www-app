import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all duration-300 hover:bg-brand-500 hover:scale-110 hover:shadow-xl"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] sm:w-[420px] rounded-2xl bg-white shadow-2xl border border-navy-100 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white text-sm font-bold">
              TN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">TrustedNetworx AI</p>
              <p className="text-xs text-brand-200">We typically reply in under 5 minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* IFrame: loads CRM lead form */}
          <iframe
            src="https://enhancedlines.com/embed/f042309a-4268-4d51-986d-c1a827af9dea"
            width="100%"
            height="480"
            frameBorder="0"
            title="Chat with TrustedNetworx"
            className="block"
          />
        </div>
      )}
    </>
  );
};

export default ChatWidget;
