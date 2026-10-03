import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BARBER_SERVICES,
  MASTER_BARBERS,
  SHOP_INFO,
  BarberService,
  BarberProfile,
} from '../data/barbershopData';
import {
  X,
  Calendar,
  Clock,
  User,
  Check,
  Phone,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Crown,
  Coffee,
  ShieldCheck,
  Download,
  AlertCircle,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string | null;
}

export interface BookingRecord {
  id: string;
  reference: string;
  services: BarberService[];
  barber: BarberProfile | { id: string; name: string; role: string; specialty: string };
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientWhatsApp: string;
  beveragePreference: string;
  notes: string;
  totalPriceNgn: number;
  totalMinutes: number;
  createdAt: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServices, setSelectedServices] = useState<BarberService[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientWhatsApp, setClientWhatsApp] = useState<string>('');
  const [beverage, setBeverage] = useState<string>('Chilled Maltina');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Initialize preselected service if provided
  useEffect(() => {
    if (preselectedServiceId) {
      const found = BARBER_SERVICES.find((s) => s.id === preselectedServiceId);
      if (found) {
        setSelectedServices([found]);
      }
    } else if (selectedServices.length === 0) {
      setSelectedServices([BARBER_SERVICES[0]]);
    }
  }, [preselectedServiceId, isOpen]);

  // Generate the next 14 days
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const iso = d.toISOString().split('T')[0];
    const isToday = i === 0;
    const isSunday = d.getDay() === 0;
    return { iso, dayName, dayNum, month, isToday, isSunday };
  });

  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setSelectedDate(dateOptions[0].iso);
    }
  }, [dateOptions, selectedDate]);

  // Generate time slots based on opening hours (8:00 AM - 8:30 PM, Sundays from 10:00 AM)
  const isSelectedDateSunday = () => {
    if (!selectedDate) return false;
    const d = new Date(selectedDate);
    return d.getDay() === 0;
  };

  const getTimeSlots = () => {
    const startHour = isSelectedDateSunday() ? 10 : 8;
    const slots: string[] = [];
    for (let h = startHour; h <= 20; h++) {
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      slots.push(`${hour12}:00 ${ampm}`);
      if (h < 20) {
        slots.push(`${hour12}:30 ${ampm}`);
      }
    }
    slots.push('8:00 PM');
    return slots;
  };

  const timeSlots = getTimeSlots();

  const toggleService = (service: BarberService) => {
    const exists = selectedServices.some((s) => s.id === service.id);
    if (exists) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.priceNgn, 0);
  const totalMinutes = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleConfirmBooking = () => {
    if (!clientName || !clientPhone) {
      alert('Please provide your name and phone number to secure your booking.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref = `KB-OGI-${randomSuffix}`;

    const chosenBarber =
      selectedBarber === 'any'
        ? {
            id: 'any',
            name: 'First Available Master Barber',
            role: 'Senior Stylist on Duty',
            specialty: 'Precision Grooming',
          }
        : MASTER_BARBERS.find((b) => b.id === selectedBarber) || MASTER_BARBERS[0];

    const record: BookingRecord = {
      id: Date.now().toString(),
      reference: ref,
      services: selectedServices,
      barber: chosenBarber,
      date: selectedDate,
      timeSlot: selectedTimeSlot || '10:00 AM',
      clientName,
      clientPhone,
      clientWhatsApp: clientWhatsApp || clientPhone,
      beveragePreference: beverage,
      notes,
      totalPriceNgn: totalPrice,
      totalMinutes,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(record);
    setStep(5);

    // Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('kb_barber_bookings') || '[]');
      existing.unshift(record);
      localStorage.setItem('kb_barber_bookings', JSON.stringify(existing));
    } catch {
      // localstorage fallback safe
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#fcedaf', '#ffffff', '#22c55e'],
    });
  };

  const sendWhatsAppConfirmation = () => {
    if (!confirmedBooking) return;

    const serviceNames = confirmedBooking.services.map((s) => s.name).join(', ');
    const message = `👑 *NEW APPOINTMENT BOOKING - K.B INTERNATIONAL BARBER'S SHOP* 👑
----------------------------------------
*Booking Ref:* ${confirmedBooking.reference}
*Client Name:* ${confirmedBooking.clientName}
*Phone / WhatsApp:* ${confirmedBooking.clientPhone}
*Date:* ${confirmedBooking.date}
*Time Slot:* ${confirmedBooking.timeSlot}
*Barber:* ${confirmedBooking.barber.name}
*Service(s):* ${serviceNames}
*Total Estimated:* ₦${confirmedBooking.totalPriceNgn.toLocaleString()} (${confirmedBooking.totalMinutes} mins)
*VIP Beverage Choice:* ${confirmedBooking.beveragePreference}
${confirmedBooking.notes ? `*Special Request:* ${confirmedBooking.notes}\n` : ''}
*Location:* Smart Junction, Ogijo 121101, Ogun State.

Please confirm my chair reservation. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${encoded}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#121215] border-2 border-[#d4af37]/50 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col my-auto max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#181610] via-[#1f1c14] to-[#181610] px-6 py-4 border-b border-[#27272a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide">
                RESERVE YOUR CHAIR
              </h3>
              <p className="text-[11px] text-[#d4af37] font-medium tracking-wider uppercase">
                KB International · Smart Junction, Ogijo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5 text-[#d4af37]" />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        {step < 5 && (
          <div className="bg-[#0e0e11] px-6 py-3 border-b border-[#27272a] shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className={step >= 1 ? 'text-[#d4af37]' : 'text-neutral-500'}>
                1. Services
              </span>
              <span className="text-neutral-700">·</span>
              <span className={step >= 2 ? 'text-[#d4af37]' : 'text-neutral-500'}>
                2. Barber
              </span>
              <span className="text-neutral-700">·</span>
              <span className={step >= 3 ? 'text-[#d4af37]' : 'text-neutral-500'}>
                3. Date & Time
              </span>
              <span className="text-neutral-700">·</span>
              <span className={step >= 4 ? 'text-[#d4af37]' : 'text-neutral-500'}>
                4. Details
              </span>
            </div>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: SERVICES SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white">
                    Select Your Grooming Services
                  </h4>
                  <p className="text-xs text-neutral-400">
                    You can select multiple treatments for a complete royal session.
                  </p>
                </div>
                <span className="text-xs text-[#d4af37] font-semibold bg-[#18181b] border border-[#27272a] px-3 py-1 rounded-md">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {BARBER_SERVICES.map((service) => {
                  const isSelected = selectedServices.some((s) => s.id === service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1e1c14] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#18181b] border-[#27272a] hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-cinzel text-sm font-bold text-white leading-tight">
                          {service.name}
                        </span>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#d4af37] text-black'
                              : 'border border-neutral-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-[#27272a]">
                        <span className="text-sm font-extrabold text-[#fcedaf] font-cinzel">
                          {formatNaira(service.priceNgn)}
                        </span>
                        <span className="text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#d4af37]" />
                          <span>{service.duration}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: BARBER SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  Choose Your Master Barber
                </h4>
                <p className="text-xs text-neutral-400">
                  Select a specific craftsman or choose First Available for priority seating.
                </p>
              </div>

              {/* First Available Option */}
              <div
                onClick={() => setSelectedBarber('any')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedBarber === 'any'
                    ? 'bg-[#1e1c14] border-[#d4af37]'
                    : 'bg-[#18181b] border-[#27272a] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#27272a] flex items-center justify-center text-[#d4af37]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-cinzel text-sm font-bold text-white">
                      First Available Master Barber
                    </h5>
                    <p className="text-xs text-neutral-400">
                      Guaranteed lowest wait time upon your arrival.
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedBarber === 'any'
                      ? 'bg-[#d4af37] text-black'
                      : 'border border-neutral-600'
                  }`}
                >
                  {selectedBarber === 'any' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Master Barbers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MASTER_BARBERS.map((barber) => {
                  const isSelected = selectedBarber === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1e1c14] border-[#d4af37]'
                          : 'bg-[#18181b] border-[#27272a] hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={barber.avatar}
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#d4af37]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-cinzel text-sm font-bold text-white truncate">
                            {barber.name}
                          </h5>
                          <p className="text-[11px] text-[#d4af37] font-medium">{barber.role}</p>
                          <p className="text-[10px] text-neutral-400">{barber.experience}</p>
                        </div>
                      </div>

                      <div className="text-xs text-neutral-300 bg-[#121215] p-2 rounded mb-2">
                        <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Specialty:</span>
                        <span className="truncate block">{barber.specialty}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#27272a]">
                        <span className="text-[#fcedaf] font-semibold">★ {barber.rating} rating</span>
                        <span className="text-neutral-400">{barber.reviewsCount} reviews</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SLOT */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  Pick Date & Preferred Arrival Time
                </h4>
                <p className="text-xs text-neutral-400">
                  Smart Junction, Ogijo salon operates Monday–Saturday 8:00 AM – 8:30 PM, Sundays from 10:00 AM.
                </p>
              </div>

              {/* Date Scroll Strip */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-2">
                  Select Date (Next 14 Days):
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {dateOptions.map((date) => {
                    const isSelected = selectedDate === date.iso;
                    return (
                      <button
                        key={date.iso}
                        type="button"
                        onClick={() => setSelectedDate(date.iso)}
                        className={`px-3 py-2 rounded-xl text-center shrink-0 border transition-all cursor-pointer min-w-[70px] ${
                          isSelected
                            ? 'bg-[#d4af37] text-black font-bold border-[#d4af37] shadow-md'
                            : 'bg-[#18181b] border-[#27272a] text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        <div className="text-[10px] uppercase">{date.dayName}</div>
                        <div className="text-base font-extrabold font-cinzel leading-none my-1">
                          {date.dayNum}
                        </div>
                        <div className="text-[9px] opacity-80">
                          {date.isToday ? 'Today' : date.month}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-2">
                  Select Time Window:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4af37] text-black font-bold border-[#d4af37]'
                            : 'bg-[#18181b] border-[#27272a] text-neutral-200 hover:border-neutral-600'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#18181b] border border-[#27272a] p-3 rounded-lg flex items-center gap-2 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>
                  24/7 Standby Generator active at all hours. Your appointment will never be delayed by power cuts.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT DETAILS & PREFERENCES */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  Client Identification & VIP Perks
                </h4>
                <p className="text-xs text-neutral-400">
                  Please provide your contact so we can text or WhatsApp your confirmation code.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Chief Babatunde Adeleke"
                    className="w-full bg-[#18181b] border border-[#3f3f46] focus:border-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Phone Number (Nigerian Format) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="0805 608 7919"
                    className="w-full bg-[#18181b] border border-[#3f3f46] focus:border-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    WhatsApp Number (Optional if same as phone)
                  </label>
                  <input
                    type="tel"
                    value={clientWhatsApp}
                    onChange={(e) => setClientWhatsApp(e.target.value)}
                    placeholder="e.g. 08056087919"
                    className="w-full bg-[#18181b] border border-[#3f3f46] focus:border-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Complimentary VIP Lounge Beverage
                  </label>
                  <select
                    value={beverage}
                    onChange={(e) => setBeverage(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#3f3f46] focus:border-[#d4af37] rounded-lg px-3 py-2.5 text-sm text-white outline-none"
                  >
                    <option value="Chilled Maltina">Chilled Maltina</option>
                    <option value="Cold Bottled Spring Water">Cold Bottled Spring Water</option>
                    <option value="Hot Black Espresso / Coffee">Hot Black Espresso / Coffee</option>
                    <option value="Fresh Chilled Citrus Juice">Fresh Chilled Citrus Juice</option>
                    <option value="No Beverage Needed">No Beverage Needed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Special Notes or Style Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sensitive skin on neck, keeping the beard full, first time visiting from Ikorodu..."
                  className="w-full bg-[#18181b] border border-[#3f3f46] focus:border-[#d4af37] rounded-lg p-3 text-sm text-white placeholder-neutral-500 outline-none resize-none"
                />
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#18160f] border border-[#d4af37]/40 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400">Total Services Duration:</span>
                  <span className="font-semibold text-white">{totalMinutes} Minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#27272a]">
                  <span className="font-cinzel font-bold text-white">Estimated Investment:</span>
                  <span className="font-cinzel text-lg font-extrabold text-[#fcedaf]">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Payment is made at the salon counter after service (Cash, POS Transfer, or Card).
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION & WHATSAPP SYNC */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-[#d4af37]/20 border-2 border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
                <Crown className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#22c55e] tracking-wider uppercase">
                  Reservation Confirmed & Logged
                </span>
                <h4 className="font-cinzel text-2xl font-bold text-white">
                  WELCOME TO ROYALTY, {confirmedBooking.clientName.toUpperCase()}
                </h4>
                <p className="text-xs text-neutral-400">
                  Your appointment pass has been issued. Tap below to send your confirmation straight to our official WhatsApp.
                </p>
              </div>

              {/* Digital Pass Plaque */}
              <div className="bg-gradient-to-b from-[#18160e] to-[#0f0e0c] border-2 border-[#d4af37] rounded-2xl p-6 text-left max-w-lg mx-auto shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#27272a] pb-3 mb-4">
                  <span className="text-xs text-neutral-400">Pass Reference:</span>
                  <span className="font-mono text-sm font-bold text-[#fcedaf] tracking-wider bg-black/60 px-3 py-1 rounded border border-[#d4af37]/30">
                    {confirmedBooking.reference}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Date & Time</span>
                    <span className="font-bold text-white">
                      {confirmedBooking.date} · {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Assigned Barber</span>
                    <span className="font-bold text-white">{confirmedBooking.barber.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Services</span>
                    <span className="font-bold text-[#d4af37]">
                      {confirmedBooking.services.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Total Cost</span>
                    <span className="font-bold text-white font-cinzel text-sm">
                      {formatNaira(confirmedBooking.totalPriceNgn)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#27272a] pt-3 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Smart Junction, Ogijo, Ogun State</span>
                  <span className="text-[#22c55e] font-semibold">24/7 Power Ready</span>
                </div>
              </div>

              {/* Action Buttons: Instant WhatsApp Confirmation & Done */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <button
                  onClick={sendWhatsAppConfirmation}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-bold text-white bg-[#15803d] hover:bg-[#16a34a] rounded-xl transition-all shadow-lg shadow-[#15803d]/30 cursor-pointer active:scale-[0.98]"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-white" />
                  <span>Send Confirmation to WhatsApp (08056087919)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-[#18181b] hover:bg-[#27272a] rounded-xl border border-[#3f3f46] transition-colors cursor-pointer"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step < 5 && (
          <div className="bg-[#18181b] px-6 py-4 border-t border-[#27272a] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-[#27272a] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && selectedServices.length === 0) {
                    alert('Please select at least one service.');
                    return;
                  }
                  if (step === 3 && !selectedTimeSlot) {
                    setSelectedTimeSlot('11:00 AM');
                  }
                  setStep((prev) => (prev + 1) as 2 | 3 | 4);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="inline-flex items-center gap-2 px-7 py-2.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] via-[#f9df88] to-[#d4af37] hover:brightness-110 rounded-lg transition-all shadow-md shadow-[#d4af37]/20 cursor-pointer whitespace-nowrap"
              >
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>Complete Reservation</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
