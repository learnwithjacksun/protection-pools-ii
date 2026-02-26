import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is a protection pool?",
    answer:
      "A protection pool is a collective betting mechanism where participants pool their stakes together. If your bet loses, you get protection from the pool, minimizing your losses while maximizing your potential wins.",
  },
  {
    question: "How does the protection work?",
    answer:
      "When you join a protection pool, a portion of your stake is protected. If your bet loses, you receive compensation from the pool based on the pool's rules and available funds. This helps reduce your risk while maintaining the excitement of betting.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Yes, we use industry-standard security measures and encryption to protect your funds. All transactions are secure, and we maintain transparent records of all pool activities. Your funds are held in secure accounts until payouts are processed.",
  },
  {
    question: "How do I join a protection pool?",
    answer:
      "Simply create an account, browse available protection pools, and select one that matches your betting preferences. You can join multiple pools and manage them all from your dashboard.",
  },
  {
    question: "What are the fees?",
    answer:
      "We charge a small platform fee on successful bets, which helps maintain the protection pool system. The exact fee varies by pool type and is clearly displayed before you join. There are no hidden charges.",
  },
  {
    question: "Can I withdraw my funds anytime?",
    answer:
      "Yes, you can withdraw your available balance at any time. Withdrawals are processed within 24-48 hours. However, funds currently active in protection pools cannot be withdrawn until the pool period ends.",
  },
  {
    question: "What happens if a pool doesn't have enough funds?",
    answer:
      "Our system automatically manages pool liquidity and ensures there are always sufficient funds. We also have reserve funds to cover any shortfalls. In rare cases, payouts are prorated based on available pool funds.",
  },
  {
    question: "Do you support mobile betting?",
    answer:
      "Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones and tablets. You can access all features, join pools, and manage your account from any device.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="main px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-2 pr-4 py-1 rounded-full bg-red-600/10 border border-red-500/10 mb-4">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-space font-medium text-red-600">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-space font-extrabold text-main mb-4">
            Got Questions?
          </h2>
          <p className="text-sm md:text-base text-muted max-w-2xl mx-auto font-sans">
            Find answers to common questions about protection pools and how our
            platform works.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-secondary border border-line first:rounded-t-lg last:rounded-b-lg overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
              >
                <span className="text-base md:text-lg font-space font-semibold text-main flex-1">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-muted font-sans text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted text-sm font-sans mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:emayaksamueltom@gmail.com"
            className="btn btn-primary text-sm h-10 md:w-[200px] mx-auto w-full px-6 rounded inline-flex"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

