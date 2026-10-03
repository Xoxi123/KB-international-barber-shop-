import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Calendar } from 'lucide-react';
import { LOOKBOOK_ITEMS, BARBER_SERVICES } from '../data/barbershopData';

interface HairstyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceAndBook: (serviceId: string) => void;
}

export const HairstyleQuizModal: React.FC<HairstyleQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceAndBook,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [faceShape, setFaceShape] = useState<string>('');
  const [hairType, setHairType] = useState<string>('');
  const [beardPreference, setBeardPreference] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setCurrentStep(1);
    setFaceShape('');
    setHairType('');
    setBeardPreference('');
  };

  // Determine recommendation based on choices
  const getRecommendation = () => {
    if (hairType === 'waves') {
      return LOOKBOOK_ITEMS.find((item) => item.id === 'look-1') || LOOKBOOK_ITEMS[0];
    }
    if (hairType === 'afro_sponge') {
      return LOOKBOOK_ITEMS.find((item) => item.id === 'look-2') || LOOKBOOK_ITEMS[1];
    }
    if (hairType === 'locs') {
      return LOOKBOOK_ITEMS.find((item) => item.id === 'look-4') || LOOKBOOK_ITEMS[3];
    }
    if (beardPreference === 'full_beard' || faceShape === 'square') {
      return LOOKBOOK_ITEMS.find((item) => item.id === 'look-3') || LOOKBOOK_ITEMS[2];
    }
    return LOOKBOOK_ITEMS[0];
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#121215] border-2 border-[#d4af37]/60 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#181610] via-[#1f1c14] to-[#181610] px-6 py-4 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-cinzel text-base font-bold text-white tracking-wide">
              SIGNATURE STYLE FINDER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[#d4af37]" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6">
          {/* Step 1: Face Shape */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                Step 1 of 3 · Structure
              </span>
              <h4 className="font-cinzel text-xl font-bold text-white">
                What is your face shape?
              </h4>
              <p className="text-xs text-neutral-400">
                This helps us recommend the optimal hairline taper and temple fade angle.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'oval', label: 'Oval / Balanced', desc: 'Slightly rounded jawline, versatile' },
                  { id: 'square', label: 'Square / Strong Jaw', desc: 'Prominent jaw, bold angles' },
                  { id: 'round', label: 'Round / Full Cheeks', desc: 'Soft circular facial contour' },
                  { id: 'diamond', label: 'Diamond / High Cheekbones', desc: 'Narrow forehead & chin' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFaceShape(item.id);
                      setCurrentStep(2);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      faceShape === item.id
                        ? 'bg-[#1e1c14] border-[#d4af37]'
                        : 'bg-[#18181b] border-[#27272a] hover:border-neutral-500'
                    }`}
                  >
                    <div className="font-cinzel text-sm font-bold text-white mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-neutral-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Hair Length & Texture */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                Step 2 of 3 · Texture & Length
              </span>
              <h4 className="font-cinzel text-xl font-bold text-white">
                What hair style or texture do you prefer?
              </h4>
              <p className="text-xs text-neutral-400">
                Choose your ideal crown appearance.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'waves', label: '360 Waves / Brush Cut', desc: 'Deep swirling wave pattern' },
                  { id: 'buzz', label: 'Low Buzz Skin Fade', desc: 'Minimal maintenance, ultra crisp' },
                  { id: 'afro_sponge', label: 'Burst Fade + Sponge Coils', desc: 'High energy, youthful volume' },
                  { id: 'locs', label: 'Dreadlocs / Protective Twists', desc: 'Retwist & edge alignment' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setHairType(item.id);
                      setCurrentStep(3);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      hairType === item.id
                        ? 'bg-[#1e1c14] border-[#d4af37]'
                        : 'bg-[#18181b] border-[#27272a] hover:border-neutral-500'
                    }`}
                  >
                    <div className="font-cinzel text-sm font-bold text-white mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-neutral-400">{item.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-neutral-400 hover:text-white pt-2 cursor-pointer"
              >
                ← Back to Face Shape
              </button>
            </div>
          )}

          {/* Step 3: Beard & Facial Grooming */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                Step 3 of 3 · Facial Hair
              </span>
              <h4 className="font-cinzel text-xl font-bold text-white">
                What is your beard status?
              </h4>
              <p className="text-xs text-neutral-400">
                We contour your beard to sharpen your jawline structure.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'full_beard', label: 'Full Sculpted Beard', desc: 'Needs sharp cheek & jawlines' },
                  { id: 'goatee', label: 'Goatee / Stubble', desc: 'Defined chin & mustache' },
                  { id: 'clean', label: 'Clean Shaven', desc: 'Smooth skin & razor neck fade' },
                  { id: 'growing', label: 'Growing It Out', desc: 'Needs shaping & oil therapy' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setBeardPreference(item.id);
                      setCurrentStep(4);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      beardPreference === item.id
                        ? 'bg-[#1e1c14] border-[#d4af37]'
                        : 'bg-[#18181b] border-[#27272a] hover:border-neutral-500'
                    }`}
                  >
                    <div className="font-cinzel text-sm font-bold text-white mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-neutral-400">{item.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs text-neutral-400 hover:text-white pt-2 cursor-pointer"
              >
                ← Back to Hair Preference
              </button>
            </div>
          )}

          {/* Step 4: Result / Recommendation */}
          {currentStep === 4 && (
            <div className="space-y-5 text-center">
              <div className="space-y-1">
                <span className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider">
                  Tailored Match Determined
                </span>
                <h4 className="font-cinzel text-2xl font-bold text-white text-gold-shimmer">
                  YOUR SIGNATURE CUT: {recommendation.title.toUpperCase()}
                </h4>
              </div>

              {/* Matched Style Card */}
              <div className="bg-[#18181b] border border-[#d4af37]/60 rounded-xl overflow-hidden text-left flex flex-col sm:flex-row gap-4 p-4 shadow-xl">
                <img
                  src={recommendation.image}
                  alt={recommendation.title}
                  className="w-full sm:w-40 aspect-square sm:aspect-auto object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-cinzel text-base font-bold text-white mb-1">
                      {recommendation.title}
                    </h5>
                    <p className="text-xs text-neutral-300 mb-2">
                      {recommendation.description}
                    </p>
                    <div className="text-[11px] text-[#fcedaf] bg-[#121215] p-2 rounded">
                      <span className="font-bold">Why this works: </span>
                      Complementary balance for your facial contours and texture preference.
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Duration: {recommendation.timeRequired}</span>
                    <span className="text-[#d4af37] font-semibold">Priority Booking Available</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onSelectServiceAndBook(recommendation.serviceId);
                  }}
                  className="w-full flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Book This Style Now</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto py-3 px-4 text-xs font-semibold text-neutral-300 hover:text-white bg-[#1f1f23] rounded-lg border border-[#3f3f46] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
