// src/pages/SystemSettings/tabs/PerformanceTab.jsx
import React from "react";
import { Zap, Cpu, Cloud, Database, Image } from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import useLanguage from "../../../hooks/useLanguage";

const PerformanceTab = ({ settings, handleSettingChange }) => {
  const { t } = useLanguage();

  return (
    <SettingSection
      title={t("performance.title")}
      icon={Zap}
      description={t("performance.description")}
      color="danger"
    >
      <SettingSwitch
        label={t("performance.hardwareAccel")}
        description={t("performance.hardwareAccelDesc")}
        value={settings.hardwareAcceleration}
        onChange={() =>
          handleSettingChange(
            "hardwareAcceleration",
            !settings.hardwareAcceleration
          )
        }
        icon={Cpu}
        color="danger"
      />

      <SettingSwitch
        label={t("performance.backgroundSync")}
        description={t("performance.backgroundSyncDesc")}
        value={settings.backgroundSync}
        onChange={() =>
          handleSettingChange("backgroundSync", !settings.backgroundSync)
        }
        icon={Cloud}
        color="danger"
      />

      <SettingSwitch
        label={t("performance.cache")}
        description={t("performance.cacheDesc")}
        value={settings.cacheEnabled}
        onChange={() =>
          handleSettingChange("cacheEnabled", !settings.cacheEnabled)
        }
        icon={Database}
        color="danger"
      />

      <SettingSwitch
        label={t("performance.imageOptimization")}
        description={t("performance.imageOptimizationDesc")}
        value={settings.imageOptimization}
        onChange={() =>
          handleSettingChange("imageOptimization", !settings.imageOptimization)
        }
        icon={Image}
        color="danger"
      />
    </SettingSection>
  );
};

export default PerformanceTab;
