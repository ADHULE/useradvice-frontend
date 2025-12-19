// src/pages/SystemSettings/tabs/AccessibilityTab.jsx
import React from "react";
import { Eye, Activity, Keyboard } from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import useLanguage from "../../../hooks/useLanguage";

const AccessibilityTab = ({ settings, handleSettingChange }) => {
  const { t } = useLanguage();

  return (
    <SettingSection
      title={t("accessibility.title")}
      icon={Eye}
      description={t("accessibility.description")}
      color="info"
    >
      <SettingSwitch
        label={t("accessibility.screenReader")}
        description={t("accessibility.screenReaderDesc")}
        value={settings.screenReader}
        onChange={() =>
          handleSettingChange("screenReader", !settings.screenReader)
        }
        icon={Eye}
        color="info"
      />

      <SettingSwitch
        label={t("accessibility.highContrast")}
        description={t("accessibility.highContrastDesc")}
        value={settings.highContrast}
        onChange={() =>
          handleSettingChange("highContrast", !settings.highContrast)
        }
        icon={Eye}
        color="info"
      />

      <SettingSwitch
        label={t("accessibility.reducedMotion")}
        description={t("accessibility.reducedMotionDesc")}
        value={settings.reducedMotion}
        onChange={() =>
          handleSettingChange("reducedMotion", !settings.reducedMotion)
        }
        icon={Activity}
        color="info"
      />

      <SettingSwitch
        label={t("accessibility.keyboardShortcuts")}
        description={t("accessibility.keyboardShortcutsDesc")}
        value={settings.keyboardShortcuts}
        onChange={() =>
          handleSettingChange("keyboardShortcuts", !settings.keyboardShortcuts)
        }
        icon={Keyboard}
        color="info"
      />
    </SettingSection>
  );
};

export default AccessibilityTab;
