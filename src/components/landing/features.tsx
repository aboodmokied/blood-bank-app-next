"use client";

import {
  Activity,
  Calendar,
  Database,
  Shield,
  Users,
  Hospital,
} from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("features");

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="mx-auto container p-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Donor Matching */}
          <FeatureCard
            icon={<Users className="h-8 w-8 text-red-600" />}
            title={t("donorMatchingTitle")}
            description={t("donorMatchingDesc")}
          />

          {/* Hospital Integration */}
          <FeatureCard
            icon={<Hospital className="h-8 w-8 text-red-600" />}
            title={t("hospitalIntegrationTitle")}
            description={t("hospitalIntegrationDesc")}
          />

          {/* Real-time Inventory */}
          <FeatureCard
            icon={<Database className="h-8 w-8 text-red-600" />}
            title={t("inventoryTitle")}
            description={t("inventoryDesc")}
          />

          {/* Data Security */}
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-red-600" />}
            title={t("securityTitle")}
            description={t("securityDesc")}
          />

          {/* Analytics & Reporting */}
          <FeatureCard
            icon={<Activity className="h-8 w-8 text-red-600" />}
            title={t("reportsTitle")}
            description={t("reportsDesc")}
          />

          {/* Online Appointments */}
          <FeatureCard
            icon={<Calendar className="h-8 w-8 text-red-600" />}
            title={t("appointmentsTitle")}
            description={t("appointmentsDesc")}
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ">
    <div className="bg-red-100 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Features;
