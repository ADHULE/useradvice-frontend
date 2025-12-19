// src/pages/SystemSettings/tabs/AppearanceTab.jsx
import React, { useState } from "react";
import {
  Palette,
  Globe,
  FileText,
  Activity,
  Moon,
  Sun,
  Clock,
} from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import SettingSelect from "../components/SettingSelect.jsx";
import SettingInput from "../components/SettingInput.jsx";
import useTheme from "../../../hooks/useTheme";
import useLanguage from "../../../hooks/useLanguage";

const AppearanceTab = ({ settings, handleSettingChange }) => {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage, availableLanguages, currentLanguageInfo } =
    useLanguage();
  const [timezone, setTimezone] = useState("Europe/Paris");

  const themeOptions = [
    { value: "violet", label: t("theme.violet") },
    { value: "blue", label: t("theme.blue") },
    { value: "green", label: t("theme.green") },
    { value: "red", label: t("theme.red") },
    { value: "orange", label: t("theme.orange") },
    { value: "pink", label: t("theme.pink") },
  ];

  const fontSizeOptions = [
    { value: "small", label: t("font.small") },
    { value: "medium", label: t("font.medium") },
    { value: "large", label: t("font.large") },
    { value: "xlarge", label: t("font.xlarge") },
  ];

  // Options de langue avec drapeaux et noms complets
  const languageOptions = availableLanguages.map((lang) => ({
    value: lang.code,
    label: `${lang.flag} ${lang.nativeName}`,
    title: `${lang.name} - ${lang.country}`,
  }));

  // Déterminer le placeholder de timezone basé sur la langue
  const getTimezonePlaceholder = () => {
    switch (language) {
      case "fr":
        return "Europe/Paris";
      case "en":
        return "Europe/London";
      case "sw":
        return "Africa/Nairobi";
      case "ln":
        return "Africa/Kinshasa";
      default:
        return "Europe/Paris";
    }
  };

  // Description dynamique pour le mode sombre
  const getDarkModeDescription = () => {
    return theme === "dark" ? t("theme.dark") : t("theme.light");
  };

  return (
    <>
      <SettingSection
        title={t("appearance.title")}
        icon={Palette}
        description={t("appearance.description")}
        color="primary"
      >
        <SettingSwitch
          label={t("theme.dark")}
          description={getDarkModeDescription()}
          value={theme === "dark"}
          onChange={toggleTheme}
          icon={theme === "dark" ? Moon : Sun}
          color="primary"
        />

        <SettingSelect
          label={t("theme.color")}
          description={t("theme.color")}
          value={settings.themeColor}
          onChange={(e) => handleSettingChange("themeColor", e.target.value)}
          icon={Palette}
          options={themeOptions}
          color="primary"
        />

        <SettingSelect
          label={t("theme.fontSize")}
          description={t("theme.fontSize")}
          value={settings.fontSize}
          onChange={(e) => handleSettingChange("fontSize", e.target.value)}
          icon={FileText}
          options={fontSizeOptions}
          color="primary"
        />

        <SettingSwitch
          label={t("appearance.animations")}
          description={t("appearance.animationsDesc")}
          value={settings.animations}
          onChange={() =>
            handleSettingChange("animations", !settings.animations)
          }
          icon={Activity}
          color="primary"
        />
      </SettingSection>

      <SettingSection
        title={t("language.title")}
        icon={Globe}
        description={t("language.description")}
        color="info"
        delay={0.1}
      >
        <div className="language-selection-info">
          <div className="current-language-display">
            <span className="current-language-flag">
              {currentLanguageInfo.flag}
            </span>
            <div className="current-language-details">
              <span className="current-language-name">
                {currentLanguageInfo.nativeName}
              </span>
              <span className="current-language-country">
                {currentLanguageInfo.country}
              </span>
            </div>
          </div>
        </div>

        <SettingSelect
          label={t("language.select")}
          description={t("language.selectDesc")}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          icon={Globe}
          options={languageOptions}
          color="info"
        />

        <SettingInput
          label={t("timezone")}
          description={t("timezoneDesc")}
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          icon={Clock}
          placeholder={getTimezonePlaceholder()}
          color="info"
        />

        <div className="language-help-text">
          <p>
            <strong>{t("general.note") || "Note"}:</strong>{" "}
            {t("language.changeNote") ||
              "La modification de la langue recharge certaines parties de l'interface."}
          </p>
        </div>
      </SettingSection>
    </>
  );
};

export default AppearanceTab;
