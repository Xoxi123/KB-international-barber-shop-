import React from 'react';
import { AMENITIES, SHOP_INFO } from '../data/barbershopData';
import { Zap, ShieldCheck, Wind, Tv, Coffee, MessageSquare, Crown, Sparkles } from 'lucide-react';

interface VipLoungeProps {
  onOpenBooking: () => void;
}

export const VipLounge: React.FC<VipLoungeProps> = ({ onOpenBooking }) => {
  const icons = [
    <Zap key="1" className="w-5 h-5 text-[#d4af37]" />,
    <ShieldCheck key="2" className="w-5 h-5 text-[#d4af37]" />,
    <Wind key="3" className="w-5 h-5 text-[#d4af37]" />,
    <Tv key="4" className="w-5 h-5 text-[#d4af37]" />,
    <Coffee key="5" className="w-5 h-5 text-[#d4af37]" />,
    <MessageSquare key="6" className="w-5 h-5 text-[#d4af37]" />,
  ];

  return (
    <section id="vip" className="py-20 bg-[#0c0c0e] relative border-t border-[#1f1f23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Atmosphere */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase">
              <Crown className="w-4 h-4 text-[#d4af37]" />
              <span>The Executive Standard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance leading-tight">
              BEYOND A HAIRCUT:{' '}
              <span className="text-gold-gradient">THE ROYAL LOUNGE</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              We built KB International to eliminate every pain point of conventional Nigerian barbershops: noisy generators outside the door, blade hygiene anxiety, long waits in sweltering heat, or interrupted cuts.
            </p>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Step inside our sound-insulated lounge at Smart Junction, Ogijo. Enjoy pure chilled air conditioning, 24/7 dedicated generator power, live European football or PS5 gaming, and a complimentary cold beverage while our master barbers craft your signature aesthetic.
            </p>

            {/* Quick Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f9df88] hover:brightness-110 rounded-lg shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                Experience the VIP Suite
              </button>

              <a
                href={`https://wa.me/${SHOP_INFO.whatsappInternational}?text=Hello%20KB%20International,%20I%20want%20to%20book%20the%20VIP%20Suite`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-[#18181b] border border-[#27272a] hover:border-[#22c55e]/60 rounded-lg transition-colors"
              >
                Inquire on WhatsApp (0805 608 7919)
              </a>
            </div>
          </div>

          {/* Right Column: 6 Core Amenities */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AMENITIES.map((amenity, idx) => (
              <div
                key={amenity.title}
                className="p-5 rounded-xl bg-[#141418] border border-[#27272a] hover:border-[#d4af37]/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1f1f26] border border-[#33333d] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {icons[idx]}
                </div>

                <div className="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase mb-1">
                  {amenity.highlight}
                </div>

                <h4 className="font-cinzel text-base font-bold text-white mb-2">
                  {amenity.title}
                </h4>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
