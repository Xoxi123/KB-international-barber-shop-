import React, { useState, useEffect } from 'react';
import {
  BARBER_SERVICES,
  MASTER_BARBERS,
  SHOP_INFO,
  BarberService,
  BarberProfile,
} from '../data/barbershopData';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  MessageSquare,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  ShieldCheck,
  Coffee,
  Download,
  AlertCircle,
} from 'lucide-react';

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedBarberId?: string;
}

export interface BookingAppointment {
  reference: string;
  services: BarberService[];
  barber: BarberProfile | { id: string; name: string; specialty: string };
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientWhatsapp: string;
  drinkPreference: string;
  notes: string;
  totalNgn: number;
  totalMinutes: number;
  createdAt: string;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBarberId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServices, setSelectedServices] = useState<BarberService[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<BarberProfile | null>(null);
  const [anyBarber, setAnyBarber] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Client Form Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [drinkPreference, setDrinkPreference] = useState('Chilled Maltina');
  const [notes, setNotes] = useState('');

  // Confirmation Record
  const [confirmedBooking, setConfirmedBooking] = useState<BookingAppointment | null>(null);

  // Initialize or handle preselection
  useEffect(() => {
    if (preselectedServiceId) {
      const match = BARBER_SERVICES.find((s) => s.id === preselectedServiceId);
      if (match && !selectedServices.some((s) => s.id === match.id)) {
        setSelectedServices([match]);
      }
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedBarberId) {
      const match = MASTER_BARBERS.find((b) => b.id === preselectedBarberId);
      if (match) {
        setSelectedBarber(match);
        setAnyBarber(false);
      }
    }
  }, [preselectedBarberId]);

  // Generate next 14 selectable dates
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const isSunday = d.getDay() === 0;
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isSunday,
    };
  });

  // Default to today if unselected
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].dateString);
    }
  }, []);

  // Time Slots
  const morningSlots = ['08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM'];
  const afternoonSlots = ['12:15 PM', '01:00 PM', '02:00 PM', '02:45 PM', '03:30 PM'];
  const eveningSlots = ['04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM', '07:30 PM'];

  const toggleService = (service: BarberService) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totalNgn = selectedServices.reduce((sum, s) => sum + s.priceNgn, 0);
  const totalMinutes = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleConfirmBooking = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const ref = `KB-${Math.floor(1000 + Math.random() * 9000)}`;
    const barberAssigned = anyBarber
      ? { id: 'any', name: 'First Available Master Barber', specialty: 'All Disciplines' }
      : selectedBarber || MASTER_BARBERS[0];

    const newBooking: BookingAppointment = {
      reference: ref,
      services: selectedServices,
      barber: barberAssigned,
      date: selectedDate,
      time: selectedTime || '10:00 AM',
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientWhatsapp: clientWhatsapp.trim() || clientPhone.trim(),
      drinkPreference,
      notes: notes.trim(),
      totalNgn,
      totalMinutes,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);

    // Persist to local storage
    try {
      const stored = localStorage.getItem('kb_barbershop_bookings');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newBooking);
      localStorage.setItem('kb_barbershop_bookings', JSON.stringify(list));
    } catch {
      // LocalStorage fallback
    }

    setStep(5);

    // Fire luxury golden celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#fcedaf', '#ffffff', '#22c55e'],
    });
  };

  const sendWhatsAppBooking = () => {
    if (!confirmedBooking) return;

    const servicesList = confirmedBooking.services.map((s) => `• ${s.name} (${formatNaira(s.priceNgn)})`).join('\n');
    
    const message = `*👑 K.B INTERNATIONAL BARBER'S SHOP APPOINTMENT*
*Reference:* ${confirmedBooking.reference}

*Client Name:* ${confirmedBooking.clientName}
*Phone:* ${confirmedBooking.clientPhone}
*WhatsApp:* ${confirmedBooking.clientWhatsapp}

*Date:* ${confirmedBooking.date}
*Time:* ${confirmedBooking.time}
*Barber:* ${confirmedBooking.barber.name}

*Services Requested:*
${servicesList}

*Estimated Duration:* ${confirmedBooking.totalMinutes} mins
*Total Amount:* ${formatNaira(confirmedBooking.totalNgn)}
*Complimentary Drink:* ${confirmedBooking.drinkPreference}
${confirmedBooking.notes ? `*Special Request:* ${confirmedBooking.notes}` : ''}

_Location: Smart Junction, Ogijo 121101, Ogun State_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${encoded}`, '_blank');
  };

  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const startIso = `${confirmedBooking.date.replace(/-/g, '')}T090000Z`;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KB International Barber Shop//Appointments//EN
BEGIN:VEVENT
SUMMARY:Barber Session at KB International (${confirmedBooking.reference})
DESCRIPTION:Services: ${confirmedBooking.services.map((s) => s.name).join(', ')} with ${confirmedBooking.barber.name}. Smart Junction, Ogijo. Tel: 08056087919.
LOCATION:Smart Junction, Ogijo 121101, Ogun State, Nigeria
DTSTART:${startIso}
DURATION:PT${confirmedBooking.totalMinutes}M
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `KB_Appointment_${confirmedBooking.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#121215] border border-[#d4af37]/50 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#17140b] via-[#12110c] to-[#121215] p-5 sm:p-6 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                Reserve Your Royal Chair
              </h3>
              <div className="text-xs text-neutral-400">
                K.B International · Smart Junction, Ogijo
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="px-6 py-3 bg-[#0c0c0e] border-b border-[#27272a] flex items-center justify-between text-xs font-medium text-neutral-400">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 1 ? 'bg-[#d4af37] text-black' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-white font-semibold' : ''}>Services</span>
            </div>
            <div className="h-0.5 w-6 sm:w-12 bg-neutral-800" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 2 ? 'bg-[#d4af37] text-black' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-white font-semibold' : ''}>Barber</span>
            </div>
            <div className="h-0.5 w-6 sm:w-12 bg-neutral-800" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 3 ? 'bg-[#d4af37] text-black' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                3
              </span>
              <span className={step === 3 ? 'text-white font-semibold' : ''}>Date & Time</span>
            </div>
            <div className="h-0.5 w-6 sm:w-12 bg-neutral-800" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 4 ? 'bg-[#d4af37] text-black' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                4
              </span>
              <span className={step === 4 ? 'text-white font-semibold' : ''}>Details</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Select Service(s) */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs sm:text-sm text-neutral-400">
                  Select one or more services for your grooming session:
                </p>
                {selectedServices.length > 0 && (
                  <span className="text-xs text-[#d4af37] font-semibold">
                    {selectedServices.length} Selected ({formatNaira(totalNgn)})
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {BARBER_SERVICES.map((service) => {
                  const isSelected = selectedServices.some((s) => s.id === service.id);

                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#18160f] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'bg-[#18181b] border-[#27272a] hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#d4af37] text-black'
                              : 'border border-neutral-600 bg-neutral-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm sm:text-base">
                              {service.name}
                            </span>
                            {service.isPopular && (
                              <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 px-1.5 py-0.5 rounded font-bold uppercase">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-2">
                            <Clock className="w-3 h-3 text-[#d4af37]" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base sm:text-lg font-bold text-[#fcedaf] font-cinzel tabular-nums">
                          {formatNaira(service.priceNgn)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Barber */}
          {step === 2 && (
            <div>
              <p className="text-xs sm:text-sm text-neutral-400 mb-4">
                Choose your preferred master stylist or choose first available:
              </p>

              {/* Any Available Barber Option */}
              <div
                onClick={() => {
                  setAnyBarber(true);
                  setSelectedBarber(null);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer mb-4 flex items-center justify-between ${
                  anyBarber
                    ? 'bg-[#18160f] border-[#d4af37] shadow-sm'
                    : 'bg-[#18181b] border-[#27272a] hover:border-[#3f3f46]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      anyBarber ? 'bg-[#d4af37] text-black' : 'border border-neutral-600'
                    }`}
                  >
                    {anyBarber && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm sm:text-base">
                      First Available Master Barber (Fastest)
                    </div>
                    <div className="text-xs text-neutral-400">
                      We will assign the next available senior craftsman for zero waiting time.
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#d4af37] font-semibold uppercase">Recommended</span>
              </div>

              {/* Specific Barbers List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MASTER_BARBERS.map((barber) => {
                  const isChosen = !anyBarber && selectedBarber?.id === barber.id;

                  return (
                    <div
                      key={barber.id}
                      onClick={() => {
                        setSelectedBarber(barber);
                        setAnyBarber(false);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-3.5 items-start ${
                        isChosen
                          ? 'bg-[#18160f] border-[#d4af37] shadow-md'
                          : 'bg-[#18181b] border-[#27272a] hover:border-[#3f3f46]'
                      }`}
                    >
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-14 h-14 rounded-lg object-cover object-top border border-[#27272a] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-sm">{barber.name}</h4>
                          {isChosen && (
                            <span className="w-4 h-4 rounded-full bg-[#d4af37] flex items-center justify-center text-black">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#d4af37]">{barber.role}</div>
                        <div className="text-xs text-neutral-400 mt-1 line-clamp-1">
                          {barber.specialty}
                        </div>
                        <div className="text-[11px] text-neutral-300 mt-1.5 flex items-center gap-1 font-semibold">
                          <span className="text-[#d4af37]">★ {barber.rating}</span>
                          <span className="text-neutral-500">·</span>
                          <span>{barber.experience}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div>
              <p className="text-xs sm:text-sm text-neutral-400 mb-4">
                Select appointment date and preferred arrival time:
              </p>

              {/* Date Slider */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateString;

                  return (
                    <button
                      key={item.dateString}
                      onClick={() => setSelectedDate(item.dateString)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-3 px-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-md'
                          : 'bg-[#18181b] text-neutral-300 hover:text-white border-[#27272a]'
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-wider opacity-80">
                        {item.dayName}
                      </span>
                      <span className="text-lg font-cinzel font-bold">{item.dayNumber}</span>
                      <span className="text-[10px] opacity-75">{item.monthName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Morning Sessions (8:30 AM - 12:00 PM)
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm'
                            : 'bg-[#18181b] text-neutral-300 hover:border-neutral-500 border-[#27272a]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Afternoon Sessions (12:15 PM - 4:00 PM)
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm'
                            : 'bg-[#18181b] text-neutral-300 hover:border-neutral-500 border-[#27272a]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Evening Sessions (4:30 PM - 8:30 PM)
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {eveningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm'
                            : 'bg-[#18181b] text-neutral-300 hover:border-neutral-500 border-[#27272a]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time notice */}
              <div className="mt-4 p-3 bg-[#18181b] border border-[#27272a] rounded-lg flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>
                  All slots are protected by our 24/7 generator backup. Your cut will not be delayed by power cuts.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Client Contact & VIP Preferences */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-neutral-400">
                Provide your contact details so our salon manager can welcome you:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babatunde Adeleke"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#d4af37] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                    Phone Number (Calls) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0805 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#d4af37] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                    WhatsApp Number (for instant confirmation)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0805 608 7919"
                    value={clientWhatsapp}
                    onChange={(e) => setClientWhatsapp(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#d4af37] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fcedaf] uppercase mb-1 flex items-center gap-1">
                    <Coffee className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Complimentary Lounge Refreshment</span>
                  </label>
                  <select
                    value={drinkPreference}
                    onChange={(e) => setDrinkPreference(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#d4af37] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors cursor-pointer"
                  >
                    <option value="Chilled Maltina">Chilled Classic Maltina</option>
                    <option value="Ice Cold Bottled Spring Water">Ice Cold Bottled Spring Water</option>
                    <option value="Espresso Coffee">Fresh Hot Espresso</option>
                    <option value="Cold Star Radler">Chilled Star Radler / Soft Drink</option>
                    <option value="Fresh Citrus Juice">Chilled Citrus Fruit Juice</option>
                    <option value="No Refreshment">No Refreshment Needed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                  Special Haircut Notes or Skin Sensitivities (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitive skin on neck razor, keep natural wave line, coming with my child..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#d4af37] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                />
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-[#18160f] border border-[#d4af37]/40 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Selected Services:</span>
                  <span className="font-semibold text-white">
                    {selectedServices.map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Date & Slot:</span>
                  <span className="font-semibold text-white">
                    {selectedDate} at {selectedTime || '10:00 AM'}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Stylist:</span>
                  <span className="font-semibold text-white">
                    {anyBarber ? 'First Available Master Barber' : selectedBarber?.name || 'K.B'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#d4af37]/20 text-sm font-bold text-[#fcedaf]">
                  <span>Total Amount (Pay at Salon or Transfer):</span>
                  <span>{formatNaira(totalNgn)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Instant WhatsApp Action */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-[#d4af37]/20 border-2 border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
                  Royal Reservation Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
                  Your Chair Is Saved, {confirmedBooking.clientName.split(' ')[0]}!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-2">
                  Reference Code:{' '}
                  <span className="font-mono text-[#fcedaf] font-bold text-base px-2 py-0.5 bg-black/60 rounded border border-[#d4af37]/40">
                    {confirmedBooking.reference}
                  </span>
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-gradient-to-b from-[#18160f] to-[#11100b] border-2 border-[#d4af37] rounded-2xl p-6 text-left shadow-2xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center border-b border-[#d4af37]/30 pb-3">
                  <div>
                    <div className="font-cinzel font-bold text-white text-base">
                      K.B INTERNATIONAL
                    </div>
                    <div className="text-[11px] text-[#d4af37]">
                      Smart Junction, Ogijo, Ogun State
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-[#fcedaf]">
                    PASS #{confirmedBooking.reference}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-1">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">APPOINTMENT DATE</span>
                    <span className="font-bold text-white">{confirmedBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">SESSION TIME</span>
                    <span className="font-bold text-white">{confirmedBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">MASTER BARBER</span>
                    <span className="font-bold text-white">{confirmedBooking.barber.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">TOTAL VALUE</span>
                    <span className="font-bold text-[#fcedaf]">{formatNaira(confirmedBooking.totalNgn)}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-300 border-t border-[#d4af37]/20 pt-2">
                  <span className="text-[#d4af37] font-semibold">Service: </span>
                  {confirmedBooking.services.map((s) => s.name).join(', ')}
                </div>

                <div className="text-[11px] text-neutral-400">
                  <span className="text-[#d4af37] font-semibold">Lounge Drink: </span>
                  {confirmedBooking.drinkPreference}
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Calendar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  onClick={sendWhatsAppBooking}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#15803d] hover:bg-[#16a34a] active:scale-[0.98] rounded-lg transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Send to WhatsApp (08056087919)</span>
                </button>

                <button
                  onClick={downloadCalendarFile}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-[#18181b] hover:bg-[#232328] border border-[#27272a] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-[#d4af37]" />
                  <span>Save to Calendar</span>
                </button>
              </div>

              <div className="text-xs text-neutral-400">
                You can also call or walk in to Smart Junction, Ogijo. Tel: <strong className="text-white">0805 608 7919</strong>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        {step < 5 && (
          <div className="p-4 sm:p-6 bg-[#0c0c0e] border-t border-[#27272a] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-[#18181b] border border-[#27272a] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f4d884] disabled:opacity-50 disabled:pointer-events-none hover:brightness-110 active:scale-[0.98] rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Continue to Barber</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            )}

            {step === 2 && (
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f4d884] hover:brightness-110 active:scale-[0.98] rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Select Date & Time</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            )}

            {step === 3 && (
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f4d884] hover:brightness-110 active:scale-[0.98] rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Enter Contact Details</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            )}

            {step === 4 && (
              <button
                onClick={handleConfirmBooking}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f4d884] hover:brightness-110 active:scale-[0.98] rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-md"
              >
                <span>Confirm & Reserve Chair</span>
                <Check className="w-4 h-4 text-black stroke-[3]" />
              </button>
            )}
          </div>
        )}

        {/* Step 5 Done Button */}
        {step === 5 && (
          <div className="p-4 bg-[#0c0c0e] border-t border-[#27272a] text-center">
            <button
              onClick={onClose}
              className="px-8 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#18181b] border border-[#27272a] rounded-lg transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
