import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../types';

interface FaqSectionProps {
  faqs: FAQ[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
            ✦ Got Questions?
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-center text-slate-900 mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base max-w-xl">
            Everything you need to know about sample requests, shipping terms, and payment process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-xs transition-colors hover:border-slate-300"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-4.5 flex items-center justify-between font-display font-bold text-left focus:outline-none cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <span className="text-slate-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="text-emerald-700 shrink-0 ml-4" size={20} />
                  ) : (
                    <ChevronDown className="text-slate-400 shrink-0 ml-4" size={20} />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
