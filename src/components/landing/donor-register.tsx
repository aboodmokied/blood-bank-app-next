"use client";

import React from "react";
import { useTranslations } from "next-intl";

const DonorRegister = () => {
  const t = useTranslations("donorRegister");

  return (
    <section id="donor-register" className="py-20 bg-white">
      <div className="mx-auto container p-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <StepCard
            step="1"
            title={t("steps.register.title")}
            description={t("steps.register.description")}
          />

          {/* Step 2 */}
          <StepCard
            step="2"
            title={t("steps.schedule.title")}
            description={t("steps.schedule.description")}
          />

          {/* Step 3 */}
          <StepCard
            step="3"
            title={t("steps.donate.title")}
            description={t("steps.donate.description")}
          />
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            {t("button")}
          </button>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
      {step}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default DonorRegister;
