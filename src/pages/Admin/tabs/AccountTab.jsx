// src/pages/SystemSettings/tabs/AccountTab.jsx
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Activity,
  Key,
  Trash2,
} from "lucide-react";
import SettingSection from "../components/SettingSection.jsx";
import SettingInput from "../components/SettingInput.jsx";
import SettingSwitch from "../components/SettingSwitch.jsx";
import useLanguage from "../../../hooks/useLanguage";

const AccountTab = ({ settings, handleSettingChange }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <SettingSection
        title={t("account.title")}
        icon={User}
        description={t("account.description")}
        color="pink"
      >
        <SettingInput
          label={t("account.email")}
          description={t("account.emailDesc")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          placeholder={t("placeholder.email")}
          color="pink"
        />

        <SettingInput
          label={t("account.password")}
          description={t("account.passwordDesc")}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          placeholder={t("placeholder.password")}
          color="pink"
        />

        <div className="settings-password-toggle">
          <button
            className="settings-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <>
                <EyeOff size={16} />
                <span>{t("account.hidePassword")}</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span>{t("account.showPassword")}</span>
              </>
            )}
          </button>
        </div>
      </SettingSection>

      <SettingSection
        title={t("account.securityTitle")}
        icon={Shield}
        description={t("account.securityDesc")}
        color="warning"
        delay={0.1}
      >
        <SettingSwitch
          label={t("account.activeSessions")}
          description={t("account.activeSessionsDesc")}
          value={true}
          onChange={() => {}}
          icon={Activity}
          color="warning"
        />

        <div className="settings-action-buttons">
          <button className="settings-action-btn warning">
            <Key size={16} />
            <span>{t("account.revokeTokens")}</span>
          </button>
          <button className="settings-action-btn danger">
            <Trash2 size={16} />
            <span>{t("account.deleteAccount")}</span>
          </button>
        </div>
      </SettingSection>
    </>
  );
};

export default AccountTab;
