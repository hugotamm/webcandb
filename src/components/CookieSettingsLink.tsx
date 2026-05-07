"use client";

import { openCookieSettings } from "./CookieBanner";

export default function CookieSettingsLink() {
  return (
    <button
      onClick={openCookieSettings}
      className="text-white/80 hover:text-brand transition text-left"
    >
      Cookie-inställningar
    </button>
  );
}
