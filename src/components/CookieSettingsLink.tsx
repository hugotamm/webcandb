"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "./CookieBanner";

export default function CookieSettingsLink() {
  const t = useTranslations("CookieSettings");
  return (
    <button
      onClick={openCookieSettings}
      className="text-foreground/80 hover:text-brand transition-colors duration-700 text-left font-light"
    >
      {t("label")}
    </button>
  );
}
