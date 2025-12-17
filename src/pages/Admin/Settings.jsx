import React, { useState, useCallback } from "react";
import {
  Bell,
  Palette,
  Save,
  Shield,
  User,
  Lock,
  Globe,
  Mail,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Database,
  Cloud,
  Smartphone,
  ShieldCheck,
  BellRing,
  Zap,
  Cpu,
  Network,
  Server,
  Wifi,
  Bluetooth,
  Battery,
  Settings as SettingsIcon,
  Key,
  Clock,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  CreditCard,
  PieChart,
  BarChart2,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Upload,
  Download,
  Trash2,
  Star,
  Heart,
  Share2,
  Link,
  ExternalLink,
  QrCode,
  Fingerprint,
  Smartphone as Phone,
  Monitor,
  Tablet,
  Headphones,
  Camera,
  Mic,
  Video,
  Music,
  Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

// Composant Section de Réglage
const SettingSection = ({
  title,
  icon: Icon,
  children,
  description,
  color = "primary",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`settings-section-container settings-section-${color}`}
  >
    <div className="settings-section-header">
      <div className="settings-section-icon-wrapper">
        <Icon size={24} className="settings-section-icon" />
      </div>
      <div className="settings-section-title-wrapper">
        <h3 className="settings-section-title">{title}</h3>
        {description && (
          <p className="settings-section-description">{description}</p>
        )}
      </div>
    </div>

    <div className="settings-section-content">{children}</div>
  </motion.div>
);

// Composant Switch
const SettingSwitch = ({
  label,
  description,
  value,
  onChange,
  icon: Icon,
  color = "primary",
}) => (
  <div className="settings-switch-container">
    <div className="settings-switch-info">
      <div className="settings-switch-header">
        {Icon && (
          <div className={`settings-switch-icon settings-icon-${color}`}>
            <Icon size={18} />
          </div>
        )}
        <div className="settings-switch-text">
          <p className="settings-switch-label">{label}</p>
          {description && (
            <p className="settings-switch-description">{description}</p>
          )}
        </div>
      </div>
    </div>

    <label className="settings-switch">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="settings-switch-input"
        aria-label={label}
      />
      <span className="settings-switch-slider">
        <span className="settings-switch-knob" />
      </span>
    </label>
  </div>
);

// Composant Input
const SettingInput = ({
  label,
  description,
  type = "text",
  value,
  onChange,
  icon: Icon,
  placeholder,
  color = "primary",
}) => (
  <div className="settings-input-container">
    <div className="settings-input-header">
      {Icon && (
        <div className={`settings-input-icon settings-icon-${color}`}>
          <Icon size={18} />
        </div>
      )}
      <div className="settings-input-info">
        <label className="settings-input-label">{label}</label>
        {description && (
          <p className="settings-input-description">{description}</p>
        )}
      </div>
    </div>

    <div className="settings-input-wrapper">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="settings-input-field"
      />
    </div>
  </div>
);

// Composant Sélecteur
const SettingSelect = ({
  label,
  description,
  value,
  onChange,
  icon: Icon,
  options = [],
  color = "primary",
}) => (
  <div className="settings-select-container">
    <div className="settings-select-header">
      {Icon && (
        <div className={`settings-select-icon settings-icon-${color}`}>
          <Icon size={18} />
        </div>
      )}
      <div className="settings-select-info">
        <label className="settings-select-label">{label}</label>
        {description && (
          <p className="settings-select-description">{description}</p>
        )}
      </div>
    </div>

    <div className="settings-select-wrapper">
      <select
        value={value}
        onChange={onChange}
        className="settings-select-field"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="settings-select-arrow">▼</div>
    </div>
  </div>
);

// Composant Bouton avec Confirmation
const SaveButton = ({ onClick, isLoading }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    onClick();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="settings-save-container">
      <button
        className={`settings-save-btn ${isLoading ? "loading" : ""}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        <Save size={18} />
        <span>Enregistrer les modifications</span>
        {isLoading && <RefreshCw size={16} className="spinning" />}
      </button>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="settings-confirmation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle size={16} />
            <span>Paramètres sauvegardés avec succès !</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SystemSettings() {
  // États pour les paramètres
  const [settings, setSettings] = useState({
    // Apparence
    darkMode: false,
    themeColor: "violet",
    fontSize: "medium",
    animations: true,

    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    soundNotifications: false,
    vibration: true,

    // Confidentialité
    twoFactorAuth: false,
    dataCollection: true,
    activityLogging: true,
    autoLogout: true,

    // Performances
    hardwareAcceleration: true,
    backgroundSync: true,
    cacheEnabled: true,
    imageOptimization: true,

    // Accessibilité
    screenReader: false,
    highContrast: false,
    reducedMotion: false,
    keyboardShortcuts: true,

    // Réseau
    autoSync: true,
    dataSaver: false,
    offlineMode: false,

    // Applications
    autoUpdate: true,
    betaFeatures: false,
    crashReports: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");
  const [language, setLanguage] = useState("fr");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Gestionnaire de changement générique
  const handleSettingChange = useCallback((key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Sauvegarder les paramètres
  const handleSaveSettings = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Paramètres sauvegardés:", settings);
      // Ici, vous feriez un appel API réel
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  // Options pour les sélecteurs
  const themeOptions = [
    { value: "violet", label: "Violet (Par défaut)" },
    { value: "blue", label: "Bleu" },
    { value: "green", label: "Vert" },
    { value: "red", label: "Rouge" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Rose" },
  ];

  const languageOptions = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
  ];

  const fontSizeOptions = [
    { value: "small", label: "Petit" },
    { value: "medium", label: "Moyen" },
    { value: "large", label: "Grand" },
    { value: "xlarge", label: "Très grand" },
  ];

  // Onglets de navigation
  const tabs = [
    { id: "appearance", label: "Apparence", icon: Palette, color: "primary" },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      color: "success",
    },
    { id: "privacy", label: "Confidentialité", icon: Shield, color: "warning" },
    { id: "performance", label: "Performance", icon: Zap, color: "danger" },
    { id: "accessibility", label: "Accessibilité", icon: Eye, color: "info" },
    { id: "network", label: "Réseau", icon: Wifi, color: "purple" },
    { id: "account", label: "Compte", icon: User, color: "pink" },
  ];

  return (
    <>
      <div className="system-settings-container">
        <Sidebar />

        <div className="system-settings-layout">
          <div className="system-settings-main">
            <main className="system-settings-content">
              {/* En-tête */}
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
                      Paramètres Système
                    </h1>
                    <p className="system-settings-subtitle">
                      <ShieldCheck size={18} className="system-subtitle-icon" />
                      Configurez et personnalisez votre expérience sur la
                      plateforme
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
                        <span className="system-stat-label">Performance</span>
                        <span className="system-stat-value">94%</span>
                      </div>
                    </div>
                    <div className="system-stat-item">
                      <div className="system-stat-icon">
                        <Shield size={20} />
                      </div>
                      <div className="system-stat-content">
                        <span className="system-stat-label">Sécurité</span>
                        <span className="system-stat-value">100%</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </header>

              {/* Navigation par onglets */}
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

              {/* Contenu des onglets */}
              <div className="system-settings-sections">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    className="system-settings-tab-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Onglet Apparence */}
                    {activeTab === "appearance" && (
                      <>
                        <SettingSection
                          title="Apparence Générale"
                          icon={Palette}
                          description="Personnalisez l'apparence de votre interface"
                          color="primary"
                        >
                          <SettingSwitch
                            label="Mode Sombre"
                            description="Interface à faible luminosité pour une utilisation nocturne"
                            value={settings.darkMode}
                            onChange={() =>
                              handleSettingChange(
                                "darkMode",
                                !settings.darkMode
                              )
                            }
                            icon={settings.darkMode ? Moon : Sun}
                            color="primary"
                          />

                          <SettingSelect
                            label="Couleur du Thème"
                            description="Couleur principale de l'interface"
                            value={settings.themeColor}
                            onChange={(e) =>
                              handleSettingChange("themeColor", e.target.value)
                            }
                            icon={Palette}
                            options={themeOptions}
                            color="primary"
                          />

                          <SettingSelect
                            label="Taille de Police"
                            description="Taille du texte dans l'interface"
                            value={settings.fontSize}
                            onChange={(e) =>
                              handleSettingChange("fontSize", e.target.value)
                            }
                            icon={FileText}
                            options={fontSizeOptions}
                            color="primary"
                          />

                          <SettingSwitch
                            label="Animations"
                            description="Activer les animations et transitions"
                            value={settings.animations}
                            onChange={() =>
                              handleSettingChange(
                                "animations",
                                !settings.animations
                              )
                            }
                            icon={Activity}
                            color="primary"
                          />
                        </SettingSection>

                        <SettingSection
                          title="Langue et Région"
                          icon={Globe}
                          description="Préférences de langue et de fuseau horaire"
                          color="info"
                          delay={0.1}
                        >
                          <SettingSelect
                            label="Langue"
                            description="Langue de l'interface"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            icon={Globe}
                            options={languageOptions}
                            color="info"
                          />

                          <SettingInput
                            label="Fuseau Horaire"
                            description="Votre fuseau horaire actuel"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            icon={Clock}
                            placeholder="Europe/Paris"
                            color="info"
                          />
                        </SettingSection>
                      </>
                    )}

                    {/* Onglet Notifications */}
                    {activeTab === "notifications" && (
                      <SettingSection
                        title="Paramètres de Notification"
                        icon={Bell}
                        description="Configurez comment vous recevez les notifications"
                        color="success"
                      >
                        <SettingSwitch
                          label="Notifications Push"
                          description="Recevoir des notifications système"
                          value={settings.pushNotifications}
                          onChange={() =>
                            handleSettingChange(
                              "pushNotifications",
                              !settings.pushNotifications
                            )
                          }
                          icon={BellRing}
                          color="success"
                        />

                        <SettingSwitch
                          label="Notifications Email"
                          description="Recevoir des notifications par email"
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
                          label="Sons de Notification"
                          description="Jouer un son lors des notifications"
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
                          label="Vibration"
                          description="Vibrer lors des notifications (mobile)"
                          value={settings.vibration}
                          onChange={() =>
                            handleSettingChange(
                              "vibration",
                              !settings.vibration
                            )
                          }
                          icon={Smartphone}
                          color="success"
                        />
                      </SettingSection>
                    )}

                    {/* Onglet Confidentialité */}
                    {activeTab === "privacy" && (
                      <SettingSection
                        title="Confidentialité et Sécurité"
                        icon={Shield}
                        description="Paramètres de confidentialité et de sécurité"
                        color="warning"
                      >
                        <SettingSwitch
                          label="Authentification à Deux Facteurs"
                          description="Protégez votre compte avec 2FA"
                          value={settings.twoFactorAuth}
                          onChange={() =>
                            handleSettingChange(
                              "twoFactorAuth",
                              !settings.twoFactorAuth
                            )
                          }
                          icon={ShieldCheck}
                          color="warning"
                        />

                        <SettingSwitch
                          label="Collecte de Données"
                          description="Partager des données anonymes pour améliorer le service"
                          value={settings.dataCollection}
                          onChange={() =>
                            handleSettingChange(
                              "dataCollection",
                              !settings.dataCollection
                            )
                          }
                          icon={Database}
                          color="warning"
                        />

                        <SettingSwitch
                          label="Journal d'Activité"
                          description="Enregistrer votre historique d'activité"
                          value={settings.activityLogging}
                          onChange={() =>
                            handleSettingChange(
                              "activityLogging",
                              !settings.activityLogging
                            )
                          }
                          icon={Clock}
                          color="warning"
                        />

                        <SettingSwitch
                          label="Déconnexion Automatique"
                          description="Déconnexion après 30 minutes d'inactivité"
                          value={settings.autoLogout}
                          onChange={() =>
                            handleSettingChange(
                              "autoLogout",
                              !settings.autoLogout
                            )
                          }
                          icon={Lock}
                          color="warning"
                        />
                      </SettingSection>
                    )}

                    {/* Onglet Performance */}
                    {activeTab === "performance" && (
                      <SettingSection
                        title="Performance Système"
                        icon={Zap}
                        description="Optimisez les performances de l'application"
                        color="danger"
                      >
                        <SettingSwitch
                          label="Accélération Matérielle"
                          description="Utiliser le GPU pour le rendu graphique"
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
                          label="Synchronisation en Arrière-plan"
                          description="Synchroniser les données en arrière-plan"
                          value={settings.backgroundSync}
                          onChange={() =>
                            handleSettingChange(
                              "backgroundSync",
                              !settings.backgroundSync
                            )
                          }
                          icon={Cloud}
                          color="danger"
                        />

                        <SettingSwitch
                          label="Cache Activé"
                          description="Utiliser le cache pour améliorer les performances"
                          value={settings.cacheEnabled}
                          onChange={() =>
                            handleSettingChange(
                              "cacheEnabled",
                              !settings.cacheEnabled
                            )
                          }
                          icon={Database}
                          color="danger"
                        />

                        <SettingSwitch
                          label="Optimisation d'Images"
                          description="Compresser automatiquement les images"
                          value={settings.imageOptimization}
                          onChange={() =>
                            handleSettingChange(
                              "imageOptimization",
                              !settings.imageOptimization
                            )
                          }
                          icon={Image}
                          color="danger"
                        />
                      </SettingSection>
                    )}

                    {/* Onglet Accessibilité */}
                    {activeTab === "accessibility" && (
                      <SettingSection
                        title="Accessibilité"
                        icon={Eye}
                        description="Paramètres pour rendre l'interface plus accessible"
                        color="info"
                      >
                        <SettingSwitch
                          label="Lecteur d'Écran"
                          description="Support pour les lecteurs d'écran"
                          value={settings.screenReader}
                          onChange={() =>
                            handleSettingChange(
                              "screenReader",
                              !settings.screenReader
                            )
                          }
                          icon={Eye}
                          color="info"
                        />

                        <SettingSwitch
                          label="Contraste Élevé"
                          description="Augmenter le contraste des couleurs"
                          value={settings.highContrast}
                          onChange={() =>
                            handleSettingChange(
                              "highContrast",
                              !settings.highContrast
                            )
                          }
                          icon={Eye}
                          color="info"
                        />

                        <SettingSwitch
                          label="Mouvements Réduits"
                          description="Réduire les animations et transitions"
                          value={settings.reducedMotion}
                          onChange={() =>
                            handleSettingChange(
                              "reducedMotion",
                              !settings.reducedMotion
                            )
                          }
                          icon={Activity}
                          color="info"
                        />

                        <SettingSwitch
                          label="Raccourcis Clavier"
                          description="Activer les raccourcis clavier"
                          value={settings.keyboardShortcuts}
                          onChange={() =>
                            handleSettingChange(
                              "keyboardShortcuts",
                              !settings.keyboardShortcuts
                            )
                          }
                          icon={Keyboard}
                          color="info"
                        />
                      </SettingSection>
                    )}

                    {/* Onglet Réseau */}
                    {activeTab === "network" && (
                      <SettingSection
                        title="Paramètres Réseau"
                        icon={Wifi}
                        description="Configurer les préférences de connexion"
                        color="purple"
                      >
                        <SettingSwitch
                          label="Synchronisation Automatique"
                          description="Synchroniser les données automatiquement"
                          value={settings.autoSync}
                          onChange={() =>
                            handleSettingChange("autoSync", !settings.autoSync)
                          }
                          icon={Cloud}
                          color="purple"
                        />

                        <SettingSwitch
                          label="Économiseur de Données"
                          description="Réduire l'utilisation des données"
                          value={settings.dataSaver}
                          onChange={() =>
                            handleSettingChange(
                              "dataSaver",
                              !settings.dataSaver
                            )
                          }
                          icon={Battery}
                          color="purple"
                        />

                        <SettingSwitch
                          label="Mode Hors Ligne"
                          description="Autoriser l'utilisation hors ligne"
                          value={settings.offlineMode}
                          onChange={() =>
                            handleSettingChange(
                              "offlineMode",
                              !settings.offlineMode
                            )
                          }
                          icon={WifiOff}
                          color="purple"
                        />
                      </SettingSection>
                    )}

                    {/* Onglet Compte */}
                    {activeTab === "account" && (
                      <>
                        <SettingSection
                          title="Informations du Compte"
                          icon={User}
                          description="Gérez vos informations personnelles"
                          color="pink"
                        >
                          <SettingInput
                            label="Adresse Email"
                            description="Votre adresse email principale"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={Mail}
                            placeholder="votre@email.com"
                            color="pink"
                          />

                          <SettingInput
                            label="Mot de Passe"
                            description="Changez votre mot de passe"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            placeholder="Nouveau mot de passe"
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
                                  <span>Masquer</span>
                                </>
                              ) : (
                                <>
                                  <Eye size={16} />
                                  <span>Afficher</span>
                                </>
                              )}
                            </button>
                          </div>
                        </SettingSection>

                        <SettingSection
                          title="Sécurité du Compte"
                          icon={Shield}
                          description="Paramètres de sécurité avancés"
                          color="warning"
                          delay={0.1}
                        >
                          <SettingSwitch
                            label="Sessions Actives"
                            description="Voir et gérer vos sessions actives"
                            value={true}
                            onChange={() => {}}
                            icon={Activity}
                            color="warning"
                          />

                          <div className="settings-action-buttons">
                            <button className="settings-action-btn warning">
                              <Key size={16} />
                              <span>Révoquer les Tokens</span>
                            </button>
                            <button className="settings-action-btn danger">
                              <Trash2 size={16} />
                              <span>Supprimer le Compte</span>
                            </button>
                          </div>
                        </SettingSection>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bouton de sauvegarde */}
                <div className="system-settings-footer">
                  <SaveButton
                    onClick={handleSaveSettings}
                    isLoading={isSaving}
                  />

                  <div className="system-settings-info">
                    <div className="system-info-item">
                      <AlertTriangle size={16} />
                      <span>
                        Les modifications prennent effet immédiatement
                      </span>
                    </div>
                    <div className="system-info-item">
                      <RefreshCw size={16} />
                      <span>Dernière sauvegarde : Il y a 2h</span>
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
