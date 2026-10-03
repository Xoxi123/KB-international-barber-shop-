import React, { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText ||
        `Hello KB International Barber Shop! I would like to book a grooming appointment at your Smart Junction, Ogijo salon.`
    );
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#121215] border border-[#d4af37]/60 rounded-xl p-4 shadow-2xl animate-scaleUp text-neutral-100">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
              <span className="text-xs font-bold text-white font-cinzel">
                WhatsApp Concierge
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4 text-[#d4af37]" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-400 mb-3">
            Official line:{' '}
            <strong className="text-[#fcedaf] font-mono">{SHOP_INFO.phone}</strong>. Select a quick action:
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                openWhatsApp('Hello! Is there an open chair right now at Smart Junction, Ogijo?');
              }}
              className="w-full text-left text-xs p-2 rounded-lg bg-[#18181b] hover:bg-[#232328] border border-[#27272a] hover:border-[#d4af37]/40 text-neutral-200 transition-colors"
            >
              ⚡ Check Instant Chair Availability
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openWhatsApp('Hello! I want to book The Royal K.B Executive Combo (₦12,000).');
              }}
              className="w-full text-left text-xs p-2 rounded-lg bg-[#18181b] hover:bg-[#232328] border border-[#27272a] hover:border-[#d4af37]/40 text-neutral-200 transition-colors"
            >
              👑 Book Royal K.B Executive Combo
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openWhatsApp('Hello! I would like to book a cut for my son (Junior Gentleman).');
              }}
              className="w-full text-left text-xs p-2 rounded-lg bg-[#18181b] hover:bg-[#232328] border border-[#27272a] hover:border-[#d4af37]/40 text-neutral-200 transition-colors"
            >
              ✂️ Book Junior Cut (Boys)
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openWhatsApp();
              }}
              className="w-full text-center text-xs py-2 bg-[#15803d] hover:bg-[#16a34a] text-white font-bold rounded-lg transition-colors shadow-sm"
            >
              Open Direct Chat (08056087919)
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#15803d] hover:bg-[#16a34a] text-white font-bold rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.4)] border border-[#22c55e]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 fill-white text-white shrink-0" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          WhatsApp 08056087919
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#d4af37] border-2 border-black rounded-full" />
      </button>
    </div>
  );
};
