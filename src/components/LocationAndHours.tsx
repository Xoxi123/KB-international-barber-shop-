import React from 'react';
import { SHOP_INFO } from '../data/barbershopData';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, ShieldCheck, Car } from 'lucide-react';

export const LocationAndHours: React.FC = () => {
  // Check if currently open based on 8:00 AM - 8:30 PM (Sunday 10:00 AM - 8:30 PM)
  const isCurrentlyOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours() + now.getMinutes() / 60;
    const startHour = day === 0 ? 10 : 8;
    const closeHour = 20.5; // 8:30 PM
    return hours >= startHour && hours <= closeHour;
  };

  const isOpen = isCurrentlyOpen();

  const handleCall = () => {
    window.open(`tel:${SHOP_INFO.phoneRaw}`, '_self');
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello KB International! I am on my way to your salon at Smart Junction, Ogijo. Is there an open chair?`
    );
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${msg}`, '_blank');
  };

  return (
    <section id="location" className="py-20 bg-[#0c0c0e] relative border-t border-[#1f1f23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Location Details & Schedule */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase mb-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Visit The Sanctuary</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white text-balance leading-tight mb-4">
                FIND US AT{' '}
                <span className="text-gold-gradient">SMART JUNCTION, OGIJO</span>
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Conveniently located along the vibrant Ogijo corridor, easily accessible from Ikorodu, Sagamu, and surrounding Ogun State districts.
              </p>

              {/* Live Status Badge */}
              <div className="flex items-center gap-3 p-3.5 bg-[#141418] border border-[#27272a] rounded-xl mb-6">
                <span
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    isOpen ? 'bg-[#22c55e] animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <div className="text-xs">
                  <span className="font-bold text-white uppercase tracking-wider block">
                    {isOpen ? 'Open Now · Closes 8:30 PM' : 'Opens Tomorrow at 8:00 AM'}
                  </span>
                  <span className="text-neutral-400">
                    Walk-ins welcomed · Priority reserved for online bookings
                  </span>
                </div>
              </div>

              {/* Contact and Address Cards */}
              <div className="space-y-3">
                <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-0.5">
                      Physical Address
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {SHOP_INFO.address}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Landmark: {SHOP_INFO.landmark}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-0.5">
                      Direct Inquiries & WhatsApp
                    </span>
                    <p className="text-base font-bold text-[#fcedaf] font-mono">
                      {SHOP_INFO.phone}
                    </p>
                    <p className="text-xs text-neutral-400">
                      Calls & WhatsApp reservations handled instantly.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#141418] border border-[#27272a] rounded-xl flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                      Weekly Operating Hours
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-neutral-400">Monday – Saturday:</span>
                        <p className="font-bold text-white">8:00 AM – 8:30 PM</p>
                      </div>
                      <div>
                        <span className="text-neutral-400">Sunday (Royal Session):</span>
                        <p className="font-bold text-white">10:00 AM – 8:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors whitespace-nowrap shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-semibold text-white bg-[#15803d] hover:bg-[#16a34a] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </button>

              <button
                onClick={handleCall}
                className="p-3 text-neutral-300 hover:text-white bg-[#18181b] border border-[#27272a] hover:border-neutral-500 rounded-lg transition-colors cursor-pointer"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Visual Map Preview Card & Neighborhood Guidance */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#27272a] bg-[#141418] h-full min-h-[380px] flex flex-col justify-between p-6">
              {/* Map stylized background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-white">
                      Ogijo Central Location Guide
                    </h4>
                    <p className="text-xs text-[#d4af37]">Smart Junction, Ogun State</p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 bg-black/60 px-2 py-1 rounded border border-[#27272a]">
                    121101
                  </span>
                </div>

                <div className="space-y-3 text-xs text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <Car className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <p>
                      <strong>Ample Secure Parking:</strong> Dedicated parking slots directly in front of the salon with security personnel on duty.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Navigation className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <p>
                      <strong>Transit Landmarks:</strong> Located immediately beside Smart Junction. Just 15 minutes from Ikorodu roundabout and 20 minutes from Sagamu bypass.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                    <p>
                      <strong>Guaranteed AC & Power:</strong> We maintain our own heavy-duty soundproof generator so your grooming session is uninterrupted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Maps Embed Box / Visual Link */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[#27272a] bg-[#0c0c0e]/80 p-4 rounded-xl border border-[#27272a]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-white font-cinzel">
                    Google Maps Place Profile
                  </span>
                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>View Map & Satellite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#18181b] hover:bg-[#232328] border border-[#d4af37]/40 rounded-lg text-xs font-bold text-[#fcedaf] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                  <span>Open K.B International on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
