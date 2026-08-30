import React, { useState } from 'react';
import qrcodeImg from '@/assets/qrcode.png';
import { CreditCard, Wallet } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const [paymentError, setPaymentError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const tronAddress = "TQjhZ2S3GVffsYdVB6dJR9K9s3cd2pSm4k";
  const marinaWhatsApp = "79891964934";
  const marinaEmail = "marinamostovskaa629@gmail.com";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(tronAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter a valid full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    const digitCount = (formData.phone.match(/\d/g) || []).length;
    if (digitCount < 7) {
      newErrors.phone = "Please enter a valid phone number (at least 7 digits).";
    }

    if (!formData.age.trim() || formData.age.trim().length < 2) {
      newErrors.age = "Please provide your daughter's age or level (e.g., '8 years' or 'Beginner').";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardPayment = async () => {
    if (!validateForm()) return;
    setPaymentError('');

    try {
      setIsPaying(true);
      setPaymentError('');

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
        }),
      });

      const data = await response.json(); // use .json() directly, no need for .text() dance

      if (!response.ok) {
        throw new Error(data.error || `Payment failed (${response.status})`);
      }

      if (!data.paymentUrl) {
        throw new Error('Payment URL not returned by server');
      }

      window.location.href = data.paymentUrl;

    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Unable to start payment');
    } finally {
      setIsPaying(false);
    }

  const handleUsdtPayment = () => {
    if (!validateForm()) return;
    setPaymentError('');
    setStep(2);
  };

  const buildWhatsAppMessage = () => {
    return `Hello Marina! 👋

I would like to book a $20 Trial Gymnastics Session.

👤 Name: ${formData.name.trim()}
📧 Email: ${formData.email.trim()}
📱 Phone/WhatsApp: ${formData.phone.trim()}
👧 Child's Age/Level: ${formData.age.trim()}
💬 Note: ${formData.message.trim() || 'Ready for trial session!'}

💳 Payment Details:
- Amount: $20 (TRC-20 USDT)
- Address: ${tronAddress}`;
  };

  const handleSendWhatsApp = () => {
    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${marinaWhatsApp}?text=${encoded}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Trial Session Registration - ${formData.name}`);
    const body = encodeURIComponent(buildWhatsAppMessage());
    window.open(`mailto:${marinaEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-white p-6 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-full">
            Trial Session • $20
          </span>
          <h3 className="text-2xl font-bold text-white">
            {step === 1 ? 'Book Your Trial Session' : 'Complete Payment & Confirm'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {step === 1
              ? 'Enter your details and choose how you would like to pay'
              : 'Scan the TRC-20 QR code to pay $20, then send your confirmation to Marina'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'}`} />
        </div>

        {/* Step 1: Form */}
        {step === 1 && (
          <form onSubmit={(event) => event.preventDefault()} className="space-y-4">
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-300">Your Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-2.5 bg-slate-800/80 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">Email Address *</label>
                <input
                  type="email"
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-4 py-2.5 bg-slate-800/80 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
              </div>

              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-4 py-2.5 bg-slate-800/80 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">Daughter's Age / Level *</label>
                <input
                  type="text"
                  placeholder="e.g. 8 years old, Beginner"
                  value={formData.age}
                  onChange={(e) => {
                    setFormData({ ...formData, age: e.target.value });
                    if (errors.age) setErrors({ ...errors, age: '' });
                  }}
                  className={`w-full px-4 py-2.5 bg-slate-800/80 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.age ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.age && <p className="mt-1 text-xs text-rose-400">{errors.age}</p>}
              </div>

              <div>
                <label className="block mb-1 text-xs font-medium text-slate-300">Preferred Time / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Weekday evenings"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            <button
              type="submit"
              disabled={isPaying || !formData.email}
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3.5 font-bold text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isPaying ? (
                'Redirecting to payment...'
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Pay by Card</span>
                </>
              )}
            </button>
              <button
                type="button"
                onClick={handleUsdtPayment}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-slate-800 px-4 py-3.5 font-bold text-white transition-colors hover:border-amber-300 hover:bg-slate-700"
              >
                <Wallet className="h-4 w-4 text-amber-300" />
                <span>Pay with USDT</span>
              </button>
            </div>
            {paymentError && <p className="text-center text-xs text-rose-400">{paymentError}</p>}
          </form>
        )}

        {/* Step 2: Payment method selection */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="relative mb-3 rounded-2xl bg-white p-3 shadow-xl">
                  <img
                    src={qrcodeImg}
                    alt="TRON QR Code"
                    className="h-48 w-48 rounded-lg object-contain"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                  TRON (TRC-20) Payment QR • $20
                </p>

                <div className="mt-3 flex w-full items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs">
                  <span className="truncate font-mono text-slate-300">{tronAddress}</span>
                  <button
                    onClick={handleCopyAddress}
                    className="shrink-0 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:bg-slate-700"
                  >
                    {copied ? 'Copied!' : 'Copy Address'}
                  </button>
                </div>
            </div>

            {/* Submit to Marina Actions */}
            <div className="space-y-3 pt-1">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Send Registration to Marina (WhatsApp)</span>
              </button>

              <div className="flex items-center justify-between gap-3 text-[13px]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ← Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  Send via Email instead →
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrialModal;
