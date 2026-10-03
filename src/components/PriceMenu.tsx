import React, { useState } from 'react';
import { BARBER_SERVICES, BarberService } from '../data/barbershopData';
import { Sparkles, Clock, Calendar, Crown, Check, Shield } from 'lucide-react';

interface PriceMenuProps {
  onBookService: (service: BarberService) => void;
}

export const PriceMenu: React.FC<PriceMenuProps> = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'haircuts' | 'beard' | 'vip' | 'locs_treatments'>('all');

  const tabs = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'haircuts', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard & Shaves' },
    { id: 'vip', label: 'VIP Royal Combos' },
    { id: 'locs_treatments', label: 'Locs & Facials' },
  ] as const;

  const filteredServices =
    activeTab === 'all'
      ? BARBER_SERVICES
      : BARBER_SERVICES.filter((s) => s.category === activeTab);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="services" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase mb-2">
            <Crown className="w-4 h-4 text-[#d4af37]" />
            <span>Executive Service Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance">
            TRANSPARENT LUXURY{' '}
            <span className="text-gold-gradient">GROOMING RATES</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Every appointment includes sterilized clippers, precision hot towel, hairline alignment, and the comfort of our air-conditioned lounge powered 24/7.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#d4af37] text-black font-bold shadow-[0_2px_14px_rgba(212,175,55,0.3)]'
                  : 'bg-[#18181b] text-neutral-300 hover:text-white hover:bg-[#232328] border border-[#27272a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isVip = service.category === 'vip';

            return (
              <div
                key={service.id}
                className={`relative rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isVip
                    ? 'bg-gradient-to-b from-[#18160f] to-[#12110c] border border-[#d4af37]/60 shadow-[0_4px_24px_rgba(212,175,55,0.12)]'
                    : 'bg-[#121215] border border-[#27272a] hover:border-[#3f3f46]'
                }`}
              >
                {/* Popular or VIP Badge */}
                {service.isPopular && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#d4af37] text-black shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-black" />
                    <span>Popular</span>
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  {/* Pricing and Duration */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#fcedaf] font-cinzel tabular-nums">
                      {formatNaira(service.priceNgn)}
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1 bg-[#1f1f23] px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {service.idealFor && (
                    <div className="text-[11px] text-neutral-400 border-t border-[#27272a] pt-3 mb-5">
                      <span className="text-[#d4af37] font-semibold">Recommended for: </span>
                      {service.idealFor}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#27272a]/60">
                  <button
                    onClick={() => onBookService(service)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                      isVip
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#f9df88] to-[#d4af37] text-black hover:brightness-110 shadow-md'
                        : 'bg-[#1c1c21] hover:bg-[#d4af37] text-neutral-200 hover:text-black border border-[#33333b] hover:border-[#d4af37]'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Select & Book Chair</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
