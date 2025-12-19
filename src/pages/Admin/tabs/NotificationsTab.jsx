// src/pages/SystemSettings/tabs/NotificationsTab.jsx
import React from "react";
import { Bell, Mail, Volume2, Smartphone, BellRing } from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import useLanguage from "../../../hooks/useLanguage";

const NotificationsTab = ({ settings, handleSettingChange }) => {
  const { t } = useLanguage();

  return (
    <SettingSection
      title={t("notifications.title")}
      icon={Bell}
      description={t("notifications.description")}
      color="success"
    >
      <SettingSwitch
        label={t("notifications.push")}
        description={t("notifications.pushDesc")}
        value={settings.pushNotifications}
        onChange={() =>
          handleSettingChange("pushNotifications", !settings.pushNotifications)
        }
        icon={BellRing}
        color="success"
      />

      <SettingSwitch
        label={t("notifications.email")}
        description={t("notifications.emailDesc")}
        value={settings.emailNotifications}
        onChange={() =>
          handleSettingChange(
            "emailNotifications",
            !settings.emailNotifications
          )
        }
        icon={Mail}
        color="success"
      />

      <SettingSwitch
        label={t("notifications.sound")}
        description={t("notifications.soundDesc")}
        value={settings.soundNotifications}
        onChange={() =>
          handleSettingChange(
            "soundNotifications",
            !settings.soundNotifications
          )
        }
        icon={Volume2}
        color="success"
      />

      <SettingSwitch
        label={t("notifications.vibration")}
        description={t("notifications.vibrationDesc")}
        value={settings.vibration}
        onChange={() => handleSettingChange("vibration", !settings.vibration)}
        icon={Smartphone}
        color="success"
      />
    </SettingSection>
  );
};

export default NotificationsTab;
