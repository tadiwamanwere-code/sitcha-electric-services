import {AlertTriangle, CheckCircle2, Clock, MapPin, MessageCircle, Phone, Send} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import React, {useState} from 'react';
import {CONTACT_INFO, PROJECT_SIZE_OPTIONS, PROJECT_TYPE_OPTIONS, SECTIONS} from '../data';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  projectType: PROJECT_TYPE_OPTIONS[0].value,
  budget: PROJECT_SIZE_OPTIONS[0],
  description: '',
};

export default function Contact() {
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormState((prev) => ({...prev, [name]: value}));
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.phone.trim() || !formState.description.trim()) {
      setValidationError('Please complete all required fields (*).');
      return;
    }
    if (formState.email.trim() && !formState.email.includes('@')) {
      setValidationError('That email address does not look right.');
      return;
    }

    setIsSubmitting(true);
    try {
      /*
       * LEAD DELIVERY — WhatsApp deep link.
       *
       * Chosen over the api/quote.ts email route deliberately: WhatsApp is already
       * Sitcha's primary customer channel, it needs no email provider or domain
       * verification, there is nothing to silently swallow a lead, and the owner
       * replies from the phone they carry anyway.
       *
       * The email route still ships in api/quote.ts. To switch back, POST
       * `formState` to /api/quote and set RESEND_API_KEY, QUOTE_TO_EMAIL, and
       * QUOTE_FROM_EMAIL — then send a real test submission and confirm receipt.
       */
      const typeLabel =
        PROJECT_TYPE_OPTIONS.find((o) => o.value === formState.projectType)?.label ??
        formState.projectType;

      const text = encodeURIComponent(
        `*Quote request — Sitcha Electric Services*\n\n` +
          `Name: ${formState.name}\n` +
          `Phone: ${formState.phone}\n` +
          (formState.email.trim() ? `Email: ${formState.email}\n` : '') +
          `Service: ${typeLabel}\n` +
          `Size: ${formState.budget}\n\n` +
          `${formState.description}`,
      );

      window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${text}`, '_blank', 'noopener');

      setIsSuccess(true);
      setFormState(EMPTY_FORM);
    } catch {
      setValidationError(
        `Something went wrong opening WhatsApp. Please call or WhatsApp us on ${CONTACT_INFO.phoneFormatted}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white text-gray-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            {/* Blue, not the amber accent: amber on white fails contrast. */}
            <span className="h-[1px] w-6 bg-blue-600" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-600 uppercase font-semibold">
              {SECTIONS.contact.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
            {SECTIONS.contact.heading}
          </h2>
          <p className="text-sm sm:text-base font-sans text-gray-600 font-light mt-4">
            {SECTIONS.contact.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/*
            Direct-contact tiles come FIRST: for a trade business tap-to-call
            consistently outperforms the form, especially on mobile.
          */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-start gap-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 p-5 transition-colors group"
            >
              <div className="w-11 h-11 bg-blue-700 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition-colors">
                <Phone className="w-5 h-5 text-yellow-500 group-hover:text-[#101820] transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase block mb-1">
                  Call Us
                </span>
                <span className="text-base font-sans text-gray-900 font-medium block">
                  {CONTACT_INFO.phoneFormatted}
                </span>
                {CONTACT_INFO.phone2Formatted && (
                  <span className="text-sm font-sans text-gray-600 block">
                    {CONTACT_INFO.phone2Formatted}
                  </span>
                )}
                {CONTACT_INFO.phone3Formatted && (
                  <span className="text-sm font-sans text-gray-600 block">
                    {CONTACT_INFO.phone3Formatted}
                  </span>
                )}
              </div>
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 p-5 transition-colors group"
            >
              <div className="w-11 h-11 bg-blue-700 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition-colors">
                <MessageCircle className="w-5 h-5 text-yellow-500 group-hover:text-[#101820] transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase block mb-1">
                  WhatsApp
                </span>
                <span className="text-base font-sans text-gray-900 font-medium block">
                  Chat with us now
                </span>
              </div>
            </a>

            <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 p-5">
              <div className="w-11 h-11 bg-blue-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase block mb-1">
                  Service Area
                </span>
                <span className="text-sm font-sans text-gray-700 font-light block">
                  {CONTACT_INFO.serviceArea}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 p-5">
              <div className="w-11 h-11 bg-blue-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase block mb-1">
                  Hours
                </span>
                <span className="text-sm font-sans text-gray-700 font-light block">
                  {CONTACT_INFO.hours}
                </span>
              </div>
            </div>
          </div>

          {/* Quote form */}
          <div className="lg:col-span-7 bg-gray-50 border border-gray-200 p-8 md:p-12 shadow-sm relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{opacity: 1}}
                  exit={{opacity: 0}}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  id="quote-form"
                  /* noValidate so the styled inline banner shows instead of
                     native browser tooltips. */
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="qf-name"
                        className="text-xs font-mono tracking-wider text-gray-600 uppercase block"
                      >
                        Full Name *
                      </label>
                      <input
                        id="qf-name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 focus:border-blue-600 px-4 py-3.5 text-sm font-sans text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors"
                        placeholder="e.g. John Moyo"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="qf-email"
                        className="text-xs font-mono tracking-wider text-gray-600 uppercase block"
                      >
                        Email Address
                      </label>
                      <input
                        id="qf-email"
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-300 focus:border-blue-600 px-4 py-3.5 text-sm font-sans text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors"
                        placeholder="you@email.com (optional)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="qf-phone"
                        className="text-xs font-mono tracking-wider text-gray-600 uppercase block"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="qf-phone"
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 focus:border-blue-600 px-4 py-3.5 text-sm font-sans text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors"
                        placeholder="e.g. 077 123 4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="qf-type"
                        className="text-xs font-mono tracking-wider text-gray-600 uppercase block"
                      >
                        Project Type
                      </label>
                      {/* Solid bg (not white/5) or the native dropdown renders
                          unreadable on Windows. */}
                      <select
                        id="qf-type"
                        name="projectType"
                        value={formState.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-300 focus:border-blue-600 px-4 py-3.5 text-sm font-sans text-gray-900 focus:outline-none transition-colors cursor-pointer"
                      >
                        {PROJECT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono tracking-wider text-gray-600 uppercase block">
                      Project Size
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {PROJECT_SIZE_OPTIONS.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormState((prev) => ({...prev, budget: range}))}
                          className={`py-3 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
                            formState.budget === range
                              ? 'bg-yellow-500 border-yellow-500 text-[#101820] font-bold'
                              : 'bg-white border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="qf-desc"
                      className="text-xs font-mono tracking-wider text-gray-600 uppercase block"
                    >
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="qf-desc"
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-white border border-gray-300 focus:border-blue-600 px-4 py-3.5 text-sm font-sans text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors resize-none"
                      placeholder="What needs doing, where you are, and anything that's already tripping or failing..."
                    />
                  </div>

                  <AnimatePresence>
                    {validationError && (
                      <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        className="p-4 bg-red-50 border border-red-300 flex items-center gap-3 text-red-700 text-xs font-mono"
                        role="alert"
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{validationError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-300 disabled:text-gray-500 text-[#101820] font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-quote-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#101820]/30 border-t-[#101820] rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND VIA WHATSAPP
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{opacity: 0, scale: 0.95}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{duration: 0.4}}
                  className="py-16 text-center space-y-6 flex flex-col items-center"
                  id="contact-success-panel"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  </div>
                  {/*
                    The deep link only OPENS WhatsApp with the message pre-filled —
                    the visitor still has to press send. Saying "we've got your
                    request" here would be a lie, so the copy tells them to finish.
                  */}
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    Almost there — press send in WhatsApp.
                  </h3>
                  <p className="text-sm font-sans text-gray-600 font-light max-w-sm leading-relaxed mx-auto">
                    We&apos;ve opened WhatsApp with your details filled in. Send the message and
                    we&apos;ll come back to you. If it didn&apos;t open, call or WhatsApp us on{' '}
                    {CONTACT_INFO.phoneFormatted}.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600 font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  >
                    SEND ANOTHER REQUEST
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
