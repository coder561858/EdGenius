import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is LearnChain?",
      answer:
        "LearnChain is a decentralized learning platform that rewards learners with on-chain credentials upon completing interactive tasks and quizzes. It combines blockchain technology with education to make achievements transparent and verifiable."
    },
    {
      question: "How do I earn on-chain credentials?",
      answer:
        "After completing a learning module or quiz, your performance is evaluated. If you pass, a credential (like an NFT badge) is minted to your wallet as proof of completion and stored immutably on the blockchain."
    },
    {
      question: "Do I need a crypto wallet to use LearnChain?",
      answer:
        "Yes, you'll need a smart wallet to collect your credentials. We support user-friendly wallets and also guide you through the setup process if you're new to crypto."
    },
    {
      question: "Is LearnChain free to use?",
      answer:
        "Absolutely! Access to learning content is free. Some premium features may be introduced in the future, but the core experience of learning and earning credentials is free."
    },
    {
      question: "How secure is my data and wallet?",
      answer:
        "LearnChain uses end-to-end encryption and integrates secure wallet providers. We do not store your private keys or sensitive data. Your credentials are safely stored on-chain and owned entirely by you."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-300">
            Find answers to your questions about LearnChain and on-chain learning
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <motion.button
                className="w-full text-left p-6 flex justify-between items-center group"
                onClick={() => toggle(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={`text-lg font-medium transition-colors duration-200 ${
                    openIndex === index ? "text-blue-400" : "text-white"
                  } group-hover:text-blue-400`}
                >
                  {faq.question}
                </span>
                <motion.span
                  className={`text-gray-400 ${
                    openIndex === index ? "text-blue-400" : ""
                  }`}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FAQ;
