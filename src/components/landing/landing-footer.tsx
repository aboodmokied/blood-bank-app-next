"use client";

import { Heart, Mail, MapPin, Phone, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const LandingFooter = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-red-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LifeBank</h3>
                <p className="text-sm text-gray-400">{t("subtitle")}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t("description")}
            </p>
            <div className="flex space-x-4">
              <button className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Users className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              {t("quickLinks.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("quickLinks.about")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("quickLinks.donate")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("quickLinks.find")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("quickLinks.events")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("quickLinks.register")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t("contact.title")}</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">{t("contact.emergency")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">{t("contact.general")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">{t("contact.email")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">{t("contact.address")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{`${t(
            "bottom.copyright"
          )} © ${new Date().getFullYear()} LifeBank`}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t("bottom.privacy")}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t("bottom.terms")}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t("bottom.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
