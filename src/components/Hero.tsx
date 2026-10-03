import React from 'react';
import { Calendar, MessageSquare, ShieldCheck, Zap, Sparkles, MapPin, Star, ArrowRight } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreLookbook }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello K.B International Barber's Shop! I would like to book a VIP grooming session.`
    );
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${text}`, '_blank');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#09090b]">
      {/* Background High-Fidelity Hero Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_barber_1791044230160.jpg"
          alt="Luxury Nigerian barbershop interior at KB International with Black gentleman receiving precision haircut"
          className="w-full h-full object-cover object-center scale-105 animate-subtleZoom opacity-40 brightness-75"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrims for WCAG AA 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-[#09090b]/50" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#09090b]/60 to-[#09090b]" />
      </div>

      {/* Decorative Gold Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4af37]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Unboxed Location & Royal Status Metadata */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6 bg-[#18181b]/80 border border-[#27272a] px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#22c55e]" />
          <span className="text-[#fcedaf] font-semibold">Ogijo, Ogun State</span>
          <span className="text-neutral-600">·</span>
          <span>Open Today until 8:30 PM</span>
          <span className="text-neutral-600">·</span>
          <span className="text-[#d4af37] flex items-center gap-1 font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#d4af37]" /> 4.9 on Google Maps
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 font-cinzel leading-[1.1] max-w-4xl mx-auto text-balance">
          PRECISION. ROYALTY.{' '}
          <span className="block mt-1 text-gold-gradient">
            UNRIVALED GROOMING.
          </span>
        </h1>

        {/* Concrete Value Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Smart Junction&apos;s premier executive grooming sanctuary. Experience surgical 360 wave sculpting, immaculate fades, hot towel beard therapy, and private VIP lounge indulgence.
        </p>

        {/* Conversion Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto mb-14">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-bold text-black bg-gradient-to-r from-[#d4af37] via-[#f7df8b] to-[#d4af37] hover:brightness-110 active:scale-[0.98] rounded-lg shadow-[0_4px_24px_rgba(212,175,55,0.35)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-5 h-5 text-black" />
            <span>Book Your Chair Online</span>
          </button>

          <button
            onClick={openWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-white bg-[#14532d]/40 hover:bg-[#15803d]/50 border border-[#22c55e]/50 hover:border-[#22c55e] rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            <MessageSquare className="w-5 h-5 text-[#22c55e]" />
            <span>WhatsApp (0805 608 7919)</span>
          </button>

          <button
            onClick={onExploreLookbook}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-neutral-300 hover:text-white bg-transparent hover:bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Explore Lookbook</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </button>
        </div>

        {/* Adjacency Trust Grid - Zero Pill Discipline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#27272a]/80 text-left">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#18181b] border border-[#27272a] text-[#d4af37] shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-cinzel">12+ Years Craft</div>
              <div className="text-xs text-neutral-400">Master Nigerian Stylists</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#18181b] border border-[#27272a] text-[#d4af37] shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-cinzel">24/7 Standby Light</div>
              <div className="text-xs text-neutral-400">Zero Grid Interruptions</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#18181b] border border-[#27272a] text-[#d4af37] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-cinzel">UV Sterilized Tools</div>
              <div className="text-xs text-neutral-400">Fresh Single-Use Blades</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#18181b] border border-[#27272a] text-[#d4af37] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-cinzel">Smart Junction</div>
              <div className="text-xs text-neutral-400">Ogijo, Ogun State</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
