// src/pages/SystemSettings/tabs/PrivacyTab.jsx
import React from "react";
import { Shield, Database, Clock, Lock, ShieldCheck } from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import useLanguage from "../../../hooks/useLanguage";

const PrivacyTab = ({ settings, handleSettingChange }) => {
  const { t } = useLanguage();

  return (
    <SettingSection
      title={t("privacy.title")}
      icon={Shield}
      description={t("privacy.description")}
      color="warning"
    >
      <SettingSwitch
        label={t("privacy.twoFactor")}
        description={t("privacy.twoFactorDesc")}
        value={settings.twoFactorAuth}
        onChange={() =>
          handleSettingChange("twoFactorAuth", !settings.twoFactorAuth)
        }
        icon={ShieldCheck}
        color="warning"
      />

      <SettingSwitch
        label={t("privacy.dataCollection")}
        description={t("privacy.dataCollectionDesc")}
        value={settings.dataCollection}
        onChange={() =>
          handleSettingChange("dataCollection", !settings.dataCollection)
        }
        icon={Database}
        color="warning"
      />

      <SettingSwitch
        label={t("privacy.activityLog")}
        description={t("privacy.activityLogDesc")}
        value={settings.activityLogging}
        onChange={() =>
          handleSettingChange("activityLogging", !settings.activityLogging)
        }
        icon={Clock}
        color="warning"
      />

      <SettingSwitch
        label={t("privacy.autoLogout")}
        description={t("privacy.autoLogoutDesc")}
        value={settings.autoLogout}
        onChange={() => handleSettingChange("autoLogout", !settings.autoLogout)}
        icon={Lock}
        color="warning"
      />
    </SettingSection>
  );
};

export default PrivacyTab;
