"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FAQProps = {
  headline: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

export default function ContactFAQ({ headline, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-24">
      <div className="mb-12">
        <h2 className="font-incognito text-4xl font-bold tracking-tight text-center">
          {headline}
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-200"
            >
              <h3 className="font-semibold text-lg dark:text-zinc-100 text-zinc-900 pr-8">
                {faq.question}
              </h3>
              <ChevronDownIcon
                className={`w-5 h-5 flex-shrink-0 dark:text-zinc-400 text-zinc-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-0">
                <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
