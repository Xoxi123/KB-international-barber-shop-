import React from 'react';
import { MASTER_BARBERS, BarberProfile } from '../data/barbershopData';
import { Star, Scissors, Award, Calendar, Sparkles } from 'lucide-react';

interface BarbersTeamProps {
  onSelectBarberAndBook: (barberId: string) => void;
}

export const BarbersTeam: React.FC<BarbersTeamProps> = ({ onSelectBarberAndBook }) => {
  return (
    <section id="barbers" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase mb-2">
            <Scissors className="w-4 h-4 text-[#d4af37]" />
            <span>Master Craftsmen</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance">
            THE ARTISANS OF{' '}
            <span className="text-gold-gradient">KB INTERNATIONAL</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Our barbers undergo rigorous apprenticeship and safety certification. From master hairline architects to kid-friendly stylists, you are always in expert hands.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASTER_BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="bg-[#121215] border border-[#27272a] hover:border-[#d4af37]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />

                  {barber.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#fcedaf] border border-[#d4af37]/40 rounded">
                      {barber.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#d4af37] font-semibold tracking-wider uppercase">
                      {barber.experience}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{barber.rating}</span>
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-white mb-1 group-hover:text-[#fcedaf] transition-colors">
                    {barber.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mb-3">{barber.role}</p>

                  <div className="bg-[#18181b] p-2.5 rounded-lg border border-[#27272a] mb-4 text-xs text-neutral-300">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 block mb-0.5">
                      Signature Skill:
                    </span>
                    <p className="line-clamp-2">{barber.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectBarberAndBook(barber.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-neutral-200 hover:text-black bg-[#18181b] hover:bg-[#d4af37] border border-[#33333b] hover:border-[#d4af37] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
