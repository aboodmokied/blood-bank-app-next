"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("features");
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const cards = [
    { count: "5,000+", label: "active-donors" },
    { count: "100+", label: "registered-hospital" },
    { count: "24/7", label: "emergency-support" },
  ];
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {cards.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="p-6 shadow-md rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">
                {item.count}
              </div>
              <div className="text-gray-600">{t(item.label)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
