// src/pages/SystemSettings/tabs/NetworkTab.jsx
import React from "react";
import { Wifi, Cloud, Battery, WifiOff } from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import useLanguage from "../../../hooks/useLanguage";

const NetworkTab = ({ settings, handleSettingChange }) => {
  const { t } = useLanguage();

  return (
    <SettingSection
      title={t("network.title")}
      icon={Wifi}
      description={t("network.description")}
      color="purple"
    >
      <SettingSwitch
        label={t("network.autoSync")}
        description={t("network.autoSyncDesc")}
        value={settings.autoSync}
        onChange={() => handleSettingChange("autoSync", !settings.autoSync)}
        icon={Cloud}
        color="purple"
      />

      <SettingSwitch
        label={t("network.dataSaver")}
        description={t("network.dataSaverDesc")}
        value={settings.dataSaver}
        onChange={() => handleSettingChange("dataSaver", !settings.dataSaver)}
        icon={Battery}
        color="purple"
      />

      <SettingSwitch
        label={t("network.offlineMode")}
        description={t("network.offlineModeDesc")}
        value={settings.offlineMode}
        onChange={() =>
          handleSettingChange("offlineMode", !settings.offlineMode)
        }
        icon={WifiOff}
        color="purple"
      />
    </SettingSection>
  );
};

export default NetworkTab;
