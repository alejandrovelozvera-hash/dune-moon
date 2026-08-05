"use client";

import { useLang } from "@/lib/i18n";

export default function LangBar() {
  const { lang, setLanguage } = useLang();

  return (
    <div className="langbar" role="group" aria-label="Language / Idioma">
      <span className="langbar__label">ES</span>
      <button
        type="button"
        className={`langbar__switch ${lang === "en" ? "langbar__switch--en" : ""}`}
        onClick={() => setLanguage(lang === "es" ? "en" : "es")}
        aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
        title={lang === "es" ? "Switch to English" : "Cambiar a español"}
      >
        <span className="langbar__thumb" />
      </button>
      <span className="langbar__label">EN</span>
    </div>
  );
}
