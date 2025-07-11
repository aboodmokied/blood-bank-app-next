"use client";

import { Droplets } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const Emergency = () => {
  const t = useTranslations("emergency");

  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="mx-auto container p-4 text-center">
        <Droplets className="h-16 w-16 mx-auto mb-6 text-white" />
        <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-xl mb-8 opacity-90">{t("description")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => {
              alert(t("createAnnouncementAlert"));
            }}
          >
            {t("createAnnouncementButton")}
          </button>
          <button
            className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            onClick={() => {
              alert(t("viewAnnouncementsAlert"));
            }}
          >
            {t("viewAnnouncementsButton")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
