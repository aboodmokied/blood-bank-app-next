"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="pt-24 pb-16 px-4 text-center">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={item}
          transition={{
            duration: 0.8,
          }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          {t("mainTitle")}
          <span className="text-red-600 block">{t("subTitle")}</span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-8 leading-relaxed"
          variants={item}
          transition={{
            duration: 0.8,
          }}
        >
          {t("p")}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={item}
          transition={{
            duration: 0.8,
          }}
        >
          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            {t("donationButton")}
          </motion.button>
          <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            {t("findButton")}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
