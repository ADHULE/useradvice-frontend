// src/pages/SystemSettings/SystemSettings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SettingsIcon,
  ShieldCheck,
  Cpu,
  Shield,
  Palette,
  Bell,
  Zap,
  Eye,
  Wifi,
  User,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

// Import des composants d'onglets
import AppearanceTab from "../tabs/AppearanceTab.jsx";
import NotificationsTab from "../tabs/NotificationsTab.jsx";
import PrivacyTab from "../tabs/PrivacyTab.jsx";
import PerformanceTab from "../tabs/PerformanceTab.jsx";
import AccessibilityTab from "../tabs/AccessibilityTab.jsx";
import NetworkTab from "../tabs/NetworkTab.jsx";
import AccountTab from "../tabs/AccountTab.jsx";

// Import des composants communs
import SaveButton from "../components/SaveButton.jsx";
import Sidebar from "../../../components/common/Sidebar.jsx";
import Footer from "../../../components/common/Footer.jsx";
import useTheme from "../../../hooks/useTheme.js";
import useLanguage from "../../../hooks/useLanguage.js";

export default function SystemSettings() {
  // Utilisez les hooks
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");
  const [settings, setSettings] = useState({
    themeColor: "violet",
    fontSize: "medium",
    animations: true,
    pushNotifications: true,
    emailNotifications: true,
    soundNotifications: false,
    vibration: true,
    twoFactorAuth: false,
    dataCollection: true,
    activityLogging: true,
    autoLogout: true,
    hardwareAcceleration: true,
    backgroundSync: true,
    cacheEnabled: true,
    imageOptimization: true,
    screenReader: false,
    highContrast: false,
    reducedMotion: false,
    keyboardShortcuts: true,
    autoSync: true,
    dataSaver: false,
    offlineMode: false,
    autoUpdate: true,
    betaFeatures: false,
    crashReports: true,
  });

  // Onglets de navigation avec traduction
  const tabs = [
    {
      id: "appearance",
      label: t("tabs.appearance"),
      icon: Palette,
      color: "primary",
    },
    {
      id: "notifications",
      label: t("tabs.notifications"),
      icon: Bell,
      color: "success",
    },
    { id: "privacy", label: t("tabs.privacy"), icon: Shield, color: "warning" },
    {
      id: "performance",
      label: t("tabs.performance"),
      icon: Zap,
      color: "danger",
    },
    {
      id: "accessibility",
      label: t("tabs.accessibility"),
      icon: Eye,
      color: "info",
    },
    { id: "network", label: t("tabs.network"), icon: Wifi, color: "purple" },
    { id: "account", label: t("tabs.account"), icon: User, color: "pink" },
  ];

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Paramètres sauvegardés:", settings);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderActiveTab = () => {
    const tabProps = {
      settings,
      handleSettingChange,
    };

    switch (activeTab) {
      case "appearance":
        return <AppearanceTab {...tabProps} />;
      case "notifications":
        return <NotificationsTab {...tabProps} />;
      case "privacy":
        return <PrivacyTab {...tabProps} />;
      case "performance":
        return <PerformanceTab {...tabProps} />;
      case "accessibility":
        return <AccessibilityTab {...tabProps} />;
      case "network":
        return <NetworkTab {...tabProps} />;
      case "account":
        return <AccountTab {...tabProps} />;
      default:
        return <AppearanceTab {...tabProps} />;
    }
  };

  return (
    <>
      <div className="system-settings-container" data-theme={theme}>
        <Sidebar />

        <div className="system-settings-layout">
          <div className="system-settings-main">
            <main className="system-settings-content">
              <header className="system-settings-header">
                <motion.div
                  className="system-header-content"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="system-header-text">
                    <h1 className="system-settings-title">
                      <SettingsIcon size={36} className="system-title-icon" />
                      {t("settings.title")}
                    </h1>
                    <p className="system-settings-subtitle">
                      <ShieldCheck size={18} className="system-subtitle-icon" />
                      {t("settings.subtitle")}
                      <span className="theme-indicator">
                        {theme === "dark"
                          ? ` (${t("theme.dark")})`
                          : ` (${t("theme.light")})`}
                      </span>
                    </p>
                  </div>

                  <motion.div
                    className="system-header-stats"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="system-stat-item">
                      <div className="system-stat-icon">
                        <Cpu size={20} />
                      </div>
                      <div className="system-stat-content">
                        <span className="system-stat-label">
                          {t("tabs.performance")}
                        </span>
                        <span className="system-stat-value">94%</span>
                      </div>
                    </div>
                    <div className="system-stat-item">
                      <div className="system-stat-icon">
                        <Shield size={20} />
                      </div>
                      <div className="system-stat-content">
                        <span className="system-stat-label">
                          {t("tabs.privacy")}
                        </span>
                        <span className="system-stat-value">100%</span>
                      </div>
                    </div>
                    <div className="system-stat-item">
                      <div className="system-stat-icon">
                        <Palette size={20} />
                      </div>
                      <div className="system-stat-content">
                        <span className="system-stat-label">
                          {t("theme.current")}
                        </span>
                        <span className="system-stat-value">
                          {theme === "dark"
                            ? t("theme.dark")
                            : t("theme.light")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </header>

              <nav className="system-settings-tabs">
                <div className="system-tabs-container">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      className={`system-tab-btn ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon size={18} className="system-tab-icon" />
                      <span className="system-tab-label">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          className="system-tab-indicator"
                          layoutId="activeTab"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </nav>

              <div className="system-settings-sections">
                <motion.div
                  key={activeTab}
                  className="system-settings-tab-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActiveTab()}
                </motion.div>

                <div className="system-settings-footer">
                  <SaveButton
                    onClick={handleSaveSettings}
                    isLoading={isSaving}
                  />

                  <div className="system-settings-info">
                    <div className="system-info-item">
                      <AlertTriangle size={16} />
                      <span>{t("settings.applyNow")}</span>
                    </div>
                    <div className="system-info-item">
                      <RefreshCw size={16} />
                      <span>{t("settings.lastSave")}: Il y a 2h</span>
                    </div>
                    <div className="system-info-item theme-info">
                      <Palette size={16} />
                      <span>
                        {t("theme.current")}:{" "}
                        <strong>
                          {theme === "dark"
                            ? t("theme.dark")
                            : t("theme.light")}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
