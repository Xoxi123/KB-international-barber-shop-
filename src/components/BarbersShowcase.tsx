import React from 'react';
import { MASTER_BARBERS, BarberProfile } from '../data/barbershopData';
import { Star, Award, Scissors, Calendar } from 'lucide-react';

interface BarbersShowcaseProps {
  onSelectBarber: (barber: BarberProfile) => void;
}

export const BarbersShowcase: React.FC<BarbersShowcaseProps> = ({ onSelectBarber }) => {
  return (
    <section id="barbers" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase block mb-2">
            The Craftsmen Behind The Blades
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance">
            MEET OUR <span className="text-gold-gradient">MASTER BARBERS</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Every barber at K.B International is an artisan with surgical blade control, deep understanding of African hair textures, and meticulous hygiene habits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASTER_BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="bg-[#121215] border border-[#27272a] rounded-xl overflow-hidden hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with gradient */}
                <div className="relative aspect-square overflow-hidden bg-neutral-900">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90" />

                  {/* Badge */}
                  {barber.badge && (
                    <div className="absolute top-3 left-3 bg-[#d4af37] text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-md">
                      {barber.badge}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs text-[#fcedaf] font-semibold border border-[#d4af37]/30">
                    <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    <span>{barber.rating}</span>
                    <span className="text-neutral-400">({barber.reviewsCount})</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#fcedaf] transition-colors">
                    {barber.name}
                  </h3>
                  <div className="text-xs text-[#d4af37] font-medium mb-1">
                    {barber.role} · {barber.experience}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    {barber.bio}
                  </p>
                  <div className="text-[11px] text-neutral-300 bg-[#18181b] p-2.5 rounded border border-[#27272a]">
                    <span className="text-[#d4af37] font-semibold block mb-0.5">Specialty:</span>
                    {barber.specialty}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectBarber(barber)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e8c662] active:scale-[0.98] rounded-lg transition-colors cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5 text-black" />
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
