"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "./CookieBanner";

export default function CookieSettingsLink() {
  const t = useTranslations("CookieSettings");
  return (
    <button
      onClick={openCookieSettings}
      className="text-white/80 hover:text-brand transition text-left"
    >
      {t("label")}
    </button>
  );
}
