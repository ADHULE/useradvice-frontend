// src/hooks/useLanguage.js
import { useState, useEffect } from "react";

/**
 * Custom hook for managing application language.
 * Features:
 * - Persists language choice to localStorage
 * - Provides translation function
 * - Supports dynamic language switching
 * - Supports 4 languages: French, English, Swahili, Lingala (RDC)
 */

// Dictionnaires de traduction
const translations = {
  fr: {
    // Paramètres généraux
    "settings.title": "Paramètres Système",
    "settings.subtitle":
      "Configurez et personnalisez votre expérience sur la plateforme",
    "settings.save": "Enregistrer les modifications",
    "settings.saving": "Sauvegarde en cours...",
    "settings.saved": "Paramètres sauvegardés avec succès !",
    "settings.applyNow": "Les modifications prennent effet immédiatement",
    "settings.lastSave": "Dernière sauvegarde",

    // Onglets
    "tabs.appearance": "Apparence",
    "tabs.notifications": "Notifications",
    "tabs.privacy": "Confidentialité",
    "tabs.performance": "Performance",
    "tabs.accessibility": "Accessibilité",
    "tabs.network": "Réseau",
    "tabs.account": "Compte",

    // Thème
    "theme.dark": "Mode Sombre",
    "theme.light": "Mode Clair",
    "theme.current": "Thème actuel",
    "theme.color": "Couleur du Thème",
    "theme.fontSize": "Taille de Police",

    // Apparence
    "appearance.title": "Apparence Générale",
    "appearance.description": "Personnalisez l'apparence de votre interface",
    "appearance.animations": "Animations",
    "appearance.animationsDesc": "Activer les animations et transitions",

    // Langue et région
    "language.title": "Langue et Région",
    "language.description": "Préférences de langue et de fuseau horaire",
    "language.select": "Langue",
    "language.selectDesc": "Langue de l'interface",
    timezone: "Fuseau Horaire",
    timezoneDesc: "Votre fuseau horaire actuel",

    // Notifications
    "notifications.title": "Paramètres de Notification",
    "notifications.description":
      "Configurez comment vous recevez les notifications",
    "notifications.push": "Notifications Push",
    "notifications.pushDesc": "Recevoir des notifications système",
    "notifications.email": "Notifications Email",
    "notifications.emailDesc": "Recevoir des notifications par email",
    "notifications.sound": "Sons de Notification",
    "notifications.soundDesc": "Jouer un son lors des notifications",
    "notifications.vibration": "Vibration",
    "notifications.vibrationDesc": "Vibrer lors des notifications (mobile)",

    // Confidentialité
    "privacy.title": "Confidentialité et Sécurité",
    "privacy.description": "Paramètres de confidentialité et de sécurité",
    "privacy.twoFactor": "Authentification à Deux Facteurs",
    "privacy.twoFactorDesc": "Protégez votre compte avec 2FA",
    "privacy.dataCollection": "Collecte de Données",
    "privacy.dataCollectionDesc":
      "Partager des données anonymes pour améliorer le service",
    "privacy.activityLog": "Journal d'Activité",
    "privacy.activityLogDesc": "Enregistrer votre historique d'activité",
    "privacy.autoLogout": "Déconnexion Automatique",
    "privacy.autoLogoutDesc": "Déconnexion après 30 minutes d'inactivité",

    // Performance
    "performance.title": "Performance Système",
    "performance.description": "Optimisez les performances de l'application",
    "performance.hardwareAccel": "Accélération Matérielle",
    "performance.hardwareAccelDesc": "Utiliser le GPU pour le rendu graphique",
    "performance.backgroundSync": "Synchronisation en Arrière-plan",
    "performance.backgroundSyncDesc":
      "Synchroniser les données en arrière-plan",
    "performance.cache": "Cache Activé",
    "performance.cacheDesc":
      "Utiliser le cache pour améliorer les performances",
    "performance.imageOptimization": "Optimisation d'Images",
    "performance.imageOptimizationDesc":
      "Compresser automatiquement les images",

    // Accessibilité
    "accessibility.title": "Accessibilité",
    "accessibility.description":
      "Paramètres pour rendre l'interface plus accessible",
    "accessibility.screenReader": "Lecteur d'Écran",
    "accessibility.screenReaderDesc": "Support pour les lecteurs d'écran",
    "accessibility.highContrast": "Contraste Élevé",
    "accessibility.highContrastDesc": "Augmenter le contraste des couleurs",
    "accessibility.reducedMotion": "Mouvements Réduits",
    "accessibility.reducedMotionDesc": "Réduire les animations et transitions",
    "accessibility.keyboardShortcuts": "Raccourcis Clavier",
    "accessibility.keyboardShortcutsDesc": "Activer les raccourcis clavier",

    // Réseau
    "network.title": "Paramètres Réseau",
    "network.description": "Configurer les préférences de connexion",
    "network.autoSync": "Synchronisation Automatique",
    "network.autoSyncDesc": "Synchroniser les données automatiquement",
    "network.dataSaver": "Économiseur de Données",
    "network.dataSaverDesc": "Réduire l'utilisation des données",
    "network.offlineMode": "Mode Hors Ligne",
    "network.offlineModeDesc": "Autoriser l'utilisation hors ligne",

    // Compte
    "account.title": "Informations du Compte",
    "account.description": "Gérez vos informations personnelles",
    "account.securityTitle": "Sécurité du Compte",
    "account.securityDesc": "Paramètres de sécurité avancés",
    "account.email": "Adresse Email",
    "account.emailDesc": "Votre adresse email principale",
    "account.password": "Mot de Passe",
    "account.passwordDesc": "Changez votre mot de passe",
    "account.showPassword": "Afficher",
    "account.hidePassword": "Masquer",
    "account.activeSessions": "Sessions Actives",
    "account.activeSessionsDesc": "Voir et gérer vos sessions actives",
    "account.revokeTokens": "Révoquer les Tokens",
    "account.deleteAccount": "Supprimer le Compte",

    // Options de thème
    "theme.violet": "Violet (Par défaut)",
    "theme.blue": "Bleu",
    "theme.green": "Vert",
    "theme.red": "Rouge",
    "theme.orange": "Orange",
    "theme.pink": "Rose",

    // Options de taille de police
    "font.small": "Petit",
    "font.medium": "Moyen",
    "font.large": "Grand",
    "font.xlarge": "Très grand",

    // Placeholders
    "placeholder.email": "votre@email.com",
    "placeholder.password": "Nouveau mot de passe",
    "placeholder.timezone": "Europe/Paris",

    // Général
    "general.performance": "Performance",
    "general.security": "Sécurité",
    "general.theme": "Thème",
    "general.ago": "Il y a",
    "general.hours": "heures",
    "general.save": "Enregistrer",
    "general.cancel": "Annuler",
    "general.yes": "Oui",
    "general.no": "Non",
    "general.ok": "OK",
    "general.back": "Retour",
    "general.next": "Suivant",
  },

  en: {
    // General settings
    "settings.title": "System Settings",
    "settings.subtitle": "Configure and customize your platform experience",
    "settings.save": "Save Changes",
    "settings.saving": "Saving...",
    "settings.saved": "Settings saved successfully!",
    "settings.applyNow": "Changes take effect immediately",
    "settings.lastSave": "Last save",

    // Tabs
    "tabs.appearance": "Appearance",
    "tabs.notifications": "Notifications",
    "tabs.privacy": "Privacy",
    "tabs.performance": "Performance",
    "tabs.accessibility": "Accessibility",
    "tabs.network": "Network",
    "tabs.account": "Account",

    // Theme
    "theme.dark": "Dark Mode",
    "theme.light": "Light Mode",
    "theme.current": "Current theme",
    "theme.color": "Theme Color",
    "theme.fontSize": "Font Size",

    // Appearance
    "appearance.title": "General Appearance",
    "appearance.description": "Customize your interface appearance",
    "appearance.animations": "Animations",
    "appearance.animationsDesc": "Enable animations and transitions",

    // Language and region
    "language.title": "Language & Region",
    "language.description": "Language and timezone preferences",
    "language.select": "Language",
    "language.selectDesc": "Interface language",
    timezone: "Timezone",
    timezoneDesc: "Your current timezone",

    // Notifications
    "notifications.title": "Notification Settings",
    "notifications.description": "Configure how you receive notifications",
    "notifications.push": "Push Notifications",
    "notifications.pushDesc": "Receive system notifications",
    "notifications.email": "Email Notifications",
    "notifications.emailDesc": "Receive notifications by email",
    "notifications.sound": "Notification Sounds",
    "notifications.soundDesc": "Play sound for notifications",
    "notifications.vibration": "Vibration",
    "notifications.vibrationDesc": "Vibrate for notifications (mobile)",

    // Privacy
    "privacy.title": "Privacy & Security",
    "privacy.description": "Privacy and security settings",
    "privacy.twoFactor": "Two-Factor Authentication",
    "privacy.twoFactorDesc": "Protect your account with 2FA",
    "privacy.dataCollection": "Data Collection",
    "privacy.dataCollectionDesc": "Share anonymous data to improve service",
    "privacy.activityLog": "Activity Logging",
    "privacy.activityLogDesc": "Record your activity history",
    "privacy.autoLogout": "Auto Logout",
    "privacy.autoLogoutDesc": "Logout after 30 minutes of inactivity",

    // Performance
    "performance.title": "System Performance",
    "performance.description": "Optimize application performance",
    "performance.hardwareAccel": "Hardware Acceleration",
    "performance.hardwareAccelDesc": "Use GPU for graphic rendering",
    "performance.backgroundSync": "Background Sync",
    "performance.backgroundSyncDesc": "Sync data in background",
    "performance.cache": "Cache Enabled",
    "performance.cacheDesc": "Use cache to improve performance",
    "performance.imageOptimization": "Image Optimization",
    "performance.imageOptimizationDesc": "Automatically compress images",

    // Accessibility
    "accessibility.title": "Accessibility",
    "accessibility.description": "Settings to make interface more accessible",
    "accessibility.screenReader": "Screen Reader",
    "accessibility.screenReaderDesc": "Support for screen readers",
    "accessibility.highContrast": "High Contrast",
    "accessibility.highContrastDesc": "Increase color contrast",
    "accessibility.reducedMotion": "Reduced Motion",
    "accessibility.reducedMotionDesc": "Reduce animations and transitions",
    "accessibility.keyboardShortcuts": "Keyboard Shortcuts",
    "accessibility.keyboardShortcutsDesc": "Enable keyboard shortcuts",

    // Network
    "network.title": "Network Settings",
    "network.description": "Configure connection preferences",
    "network.autoSync": "Auto Sync",
    "network.autoSyncDesc": "Synchronize data automatically",
    "network.dataSaver": "Data Saver",
    "network.dataSaverDesc": "Reduce data usage",
    "network.offlineMode": "Offline Mode",
    "network.offlineModeDesc": "Allow offline usage",

    // Account
    "account.title": "Account Information",
    "account.description": "Manage your personal information",
    "account.securityTitle": "Account Security",
    "account.securityDesc": "Advanced security settings",
    "account.email": "Email Address",
    "account.emailDesc": "Your primary email address",
    "account.password": "Password",
    "account.passwordDesc": "Change your password",
    "account.showPassword": "Show",
    "account.hidePassword": "Hide",
    "account.activeSessions": "Active Sessions",
    "account.activeSessionsDesc": "View and manage your active sessions",
    "account.revokeTokens": "Revoke Tokens",
    "account.deleteAccount": "Delete Account",

    // Theme options
    "theme.violet": "Violet (Default)",
    "theme.blue": "Blue",
    "theme.green": "Green",
    "theme.red": "Red",
    "theme.orange": "Orange",
    "theme.pink": "Pink",

    // Font size options
    "font.small": "Small",
    "font.medium": "Medium",
    "font.large": "Large",
    "font.xlarge": "Extra Large",

    // Placeholders
    "placeholder.email": "your@email.com",
    "placeholder.password": "New password",
    "placeholder.timezone": "Europe/Paris",

    // General
    "general.performance": "Performance",
    "general.security": "Security",
    "general.theme": "Theme",
    "general.ago": "ago",
    "general.hours": "hours",
    "general.save": "Save",
    "general.cancel": "Cancel",
    "general.yes": "Yes",
    "general.no": "No",
    "general.ok": "OK",
    "general.back": "Back",
    "general.next": "Next",
  },

  sw: {
    // General settings
    "settings.title": "Mipangilio ya Mfumo",
    "settings.subtitle": "Sanidi na ubinafsishe uzoefu wako kwenye jukwaa",
    "settings.save": "Hifadhi Mabadiliko",
    "settings.saving": "Inahifadhi...",
    "settings.saved": "Mipangilio imehifadhiwa kwa mafanikio!",
    "settings.applyNow": "Mabadiliko huanza kutumika mara moja",
    "settings.lastSave": "Hifadhi ya mwisho",

    // Tabs
    "tabs.appearance": "Mwonekano",
    "tabs.notifications": "Arifa",
    "tabs.privacy": "Faragha",
    "tabs.performance": "Utendaji",
    "tabs.accessibility": "Upatikanaji",
    "tabs.network": "Mtandao",
    "tabs.account": "Akaunti",

    // Theme
    "theme.dark": "Hali ya Giza",
    "theme.light": "Hali ya Mwangaza",
    "theme.current": "Muundo wa sasa",
    "theme.color": "Rangi ya Muundo",
    "theme.fontSize": "Ukubwa wa Herufi",

    // Appearance
    "appearance.title": "Mwonekano wa Jumla",
    "appearance.description": "Ubinafsishe mwonekano wa kiolesura chako",
    "appearance.animations": "Animations",
    "appearance.animationsDesc": "Washa animations na mageuzi",

    // Language and region
    "language.title": "Lugha na Mkoa",
    "language.description": "Mapendeleo ya lugha na eneo la muda",
    "language.select": "Lugha",
    "language.selectDesc": "Lugha ya kiolesura",
    timezone: "Eneo la Muda",
    timezoneDesc: "Eneo lako la sasa la muda",

    // Notifications
    "notifications.title": "Mipangilio ya Arifa",
    "notifications.description": "Sanidi jinsi unavyopokea arifa",
    "notifications.push": "Arifa za Kusukuma",
    "notifications.pushDesc": "Pokea arifa za mfumo",
    "notifications.email": "Arifa za Barua Pepe",
    "notifications.emailDesc": "Pokea arifa kupitia barua pepe",
    "notifications.sound": "Sauti za Arifa",
    "notifications.soundDesc": "Cheza sauti kwa arifa",
    "notifications.vibration": "Mtikisiko",
    "notifications.vibrationDesc": "Tikisa kwa arifa (simu)",

    // Privacy
    "privacy.title": "Faragha na Usalama",
    "privacy.description": "Mipangilio ya faragha na usalama",
    "privacy.twoFactor": "Uthibitishaji wa Sababu Mbili",
    "privacy.twoFactorDesc": "Linda akaunti yako na 2FA",
    "privacy.dataCollection": "Ukusanyaji wa Data",
    "privacy.dataCollectionDesc": "Shiriki data isiyojulikana kuboresha huduma",
    "privacy.activityLog": "Kurekodi Shughuli",
    "privacy.activityLogDesc": "Rekodi historia yako ya shughuli",
    "privacy.autoLogout": "Kujitoa Kiotomatiki",
    "privacy.autoLogoutDesc":
      "Jitoa baada ya dakika 30 za kutokuwa na shughuli",

    // Performance
    "performance.title": "Utendaji wa Mfumo",
    "performance.description": "Boresha utendaji wa programu",
    "performance.hardwareAccel": "Uharakishaji wa Vifaa",
    "performance.hardwareAccelDesc": "Tumia GPU kwa uchoraji wa picha",
    "performance.backgroundSync": "Sawazisha Nyuma",
    "performance.backgroundSyncDesc": "Sawazisha data nyuma",
    "performance.cache": "Cache Imewashwa",
    "performance.cacheDesc": "Tumia cache kuboresha utendaji",
    "performance.imageOptimization": "Uboreshaji wa Picha",
    "performance.imageOptimizationDesc": "Bana picha kiotomatiki",

    // Accessibility
    "accessibility.title": "Upatikanaji",
    "accessibility.description":
      "Mipangilio ya kufanya kiolesura kipatikane zaidi",
    "accessibility.screenReader": "Kisoma Skrini",
    "accessibility.screenReaderDesc": "Msaada kwa wasomaji wa skrini",
    "accessibility.highContrast": "Ulinganifu wa Juu",
    "accessibility.highContrastDesc": "Ongeza tofauti ya rangi",
    "accessibility.reducedMotion": "Mienendo Iliyopunguzwa",
    "accessibility.reducedMotionDesc": "Punguza animations na mageuzi",
    "accessibility.keyboardShortcuts": "Njia za Mkato za Kibodi",
    "accessibility.keyboardShortcutsDesc": "Washa njia za mkato za kibodi",

    // Network
    "network.title": "Mipangilio ya Mtandao",
    "network.description": "Sanidi mapendeleo ya muunganisho",
    "network.autoSync": "Sawazisha Kiotomatiki",
    "network.autoSyncDesc": "Sawazisha data kiotomatiki",
    "network.dataSaver": "Kiokoa Data",
    "network.dataSaverDesc": "Punguza matumizi ya data",
    "network.offlineMode": "Hali ya Nje ya Mtandao",
    "network.offlineModeDesc": "Ruhusu matumizi nje ya mtandao",

    // Account
    "account.title": "Taarifa za Akaunti",
    "account.description": "Dhibiti taarifa zako binafsi",
    "account.securityTitle": "Usalama wa Akaunti",
    "account.securityDesc": "Mipangilio ya hali ya juu ya usalama",
    "account.email": "Anwani ya Barua Pepe",
    "account.emailDesc": "Anwani yako kuu ya barua pepe",
    "account.password": "Nenosiri",
    "account.passwordDesc": "Badilisha nenosiri lako",
    "account.showPassword": "Onyesha",
    "account.hidePassword": "Ficha",
    "account.activeSessions": "Vikao Vilivyoamilifu",
    "account.activeSessionsDesc":
      "Tazama na dhibiti vikao vyako vilivyoamilifu",
    "account.revokeTokens": "Futa Toki",
    "account.deleteAccount": "Futa Akaunti",

    // Theme options
    "theme.violet": "Zambarau (Chaguomsingi)",
    "theme.blue": "Bluu",
    "theme.green": "Kijani",
    "theme.red": "Nyekundu",
    "theme.orange": "Chungwa",
    "theme.pink": "Waridi",

    // Font size options
    "font.small": "Ndogo",
    "font.medium": "Kati",
    "font.large": "Kubwa",
    "font.xlarge": "Kubwa Sana",

    // Placeholders
    "placeholder.email": "baruapepeyako@mfano.com",
    "placeholder.password": "Nenosiri jipya",
    "placeholder.timezone": "Africa/Nairobi",

    // General
    "general.performance": "Utendaji",
    "general.security": "Usalama",
    "general.theme": "Muundo",
    "general.ago": "iliyopita",
    "general.hours": "saa",
    "general.save": "Hifadhi",
    "general.cancel": "Ghairi",
    "general.yes": "Ndio",
    "general.no": "Hapana",
    "general.ok": "Sawa",
    "general.back": "Rudi",
    "general.next": "Ifuatayo",
  },

  ln: {
    // General settings
    "settings.title": "Mikomiselo ya Sistema",
    "settings.subtitle":
      "Tongisa mpe personnaliser expérience na yo na plateforme",
    "settings.save": "Bomba babongoli",
    "settings.saving": "Ezali kobomba...",
    "settings.saved": "Mikomiselo ebonami na bonsango!",
    "settings.applyNow": "Babongoli bazali kosala effet bongo bongo",
    "settings.lastSave": "Bobondeli ya nsuka",

    // Tabs
    "tabs.appearance": "Bomoni",
    "tabs.notifications": "Batisango",
    "tabs.privacy": "Boyokani",
    "tabs.performance": "Mosala",
    "tabs.accessibility": "Bokoki",
    "tabs.network": "Reseau",
    "tabs.account": "Compte",

    // Theme
    "theme.dark": "Mode ya Molili",
    "theme.light": "Mode ya Bongengi",
    "theme.current": "Theme ya lelo",
    "theme.color": "Langi ya Theme",
    "theme.fontSize": "Molembe ya mikanda",

    // Appearance
    "appearance.title": "Bomoni ya générale",
    "appearance.description": "Personnaliser bomoni ya interface na yo",
    "appearance.animations": "Animations",
    "appearance.animationsDesc": "Zongisa animations na babongoli",

    // Language and region
    "language.title": "Lokota na Région",
    "language.description": "Bapréférence ya lokota mpe fuseau horaire",
    "language.select": "Lokota",
    "language.selectDesc": "Lokota ya interface",
    timezone: "Fuseau Horaire",
    timezoneDesc: "Fuseau horaire na yo ya lelo",

    // Notifications
    "notifications.title": "Mikomiselo ya Batisango",
    "notifications.description": "Tongisa ndenge ozali kozwa batisango",
    "notifications.push": "Batisango ya Push",
    "notifications.pushDesc": "Zwa batisango ya système",
    "notifications.email": "Batisango ya Email",
    "notifications.emailDesc": "Zwa batisango na email",
    "notifications.sound": "Mingongo ya Batisango",
    "notifications.soundDesc": "Béta mongongo mpo na batisango",
    "notifications.vibration": "Vibration",
    "notifications.vibrationDesc": "Vibrer mpo na batisango (téléphone)",

    // Privacy
    "privacy.title": "Boyokani mpe Sécurité",
    "privacy.description": "Mikomiselo ya boyokani mpe sécurité",
    "privacy.twoFactor": "Authentification ya Bifacteur",
    "privacy.twoFactorDesc": "Batelaka compte na yo na 2FA",
    "privacy.dataCollection": "Bosangisi ya Données",
    "privacy.dataCollectionDesc":
      "Sangisa données anonyme mpo na kobongisa service",
    "privacy.activityLog": "Journal ya Mosala",
    "privacy.activityLogDesc": "Enregistrer historique na yo ya mosala",
    "privacy.autoLogout": "Kobima Automatique",
    "privacy.autoLogoutDesc": "Bima na sima ya miniti 30 ya kosala te",

    // Performance
    "performance.title": "Mosala ya Sistema",
    "performance.description": "Améliorer performance ya application",
    "performance.hardwareAccel": "Accélération Matérielle",
    "performance.hardwareAccelDesc": "Salela GPU mpo na rendu ya graphique",
    "performance.backgroundSync": "Synchronisation na Background",
    "performance.backgroundSyncDesc": "Synchroniser données na background",
    "performance.cache": "Cache Ezali na Nguya",
    "performance.cacheDesc": "Salela cache mpo na kobongisa performance",
    "performance.imageOptimization": "Optimisation ya Bilingisi",
    "performance.imageOptimizationDesc": "Compresser bilingisi automatiquement",

    // Accessibility
    "accessibility.title": "Bokoki",
    "accessibility.description": "Mikomiselo ya kosala interface ekoki lisusu",
    "accessibility.screenReader": "Mobeti ya Ekrã",
    "accessibility.screenReaderDesc": "Support mpo na babeti ya ekrã",
    "accessibility.highContrast": "Contraste Eleki",
    "accessibility.highContrastDesc": "Kolisa contraste ya balangi",
    "accessibility.reducedMotion": "Motions ya Kokutana",
    "accessibility.reducedMotionDesc": "Kokutana animations mpe babongoli",
    "accessibility.keyboardShortcuts": "Bacourt-circuit ya Clavier",
    "accessibility.keyboardShortcutsDesc": "Zongisa bacourt-circuit ya clavier",

    // Network
    "network.title": "Mikomiselo ya Réseau",
    "network.description": "Tongisa bapréférence ya connexion",
    "network.autoSync": "Synchronisation Automatique",
    "network.autoSyncDesc": "Synchroniser données automatiquement",
    "network.dataSaver": "Économiseur ya Données",
    "network.dataSaverDesc": "Kokutana utilisation ya données",
    "network.offlineMode": "Mode ya Hors Ligne",
    "network.offlineModeDesc": "Permettre utilisation hors ligne",

    // Account
    "account.title": "Information ya Compte",
    "account.description": "Gérer information na yo ya personnel",
    "account.securityTitle": "Sécurité ya Compte",
    "account.securityDesc": "Mikomiselo ya sécurité avancé",
    "account.email": "Adresse Email",
    "account.emailDesc": "Adresse email na yo ya principal",
    "account.password": "Mot de Passe",
    "account.passwordDesc": "Bongola mot de passe na yo",
    "account.showPassword": "Lakisa",
    "account.hidePassword": "Bomba",
    "account.activeSessions": "Basesion ya Actif",
    "account.activeSessionsDesc": "Tala mpe gérer basesion na yo ya actif",
    "account.revokeTokens": "Révoquer Batoki",
    "account.deleteAccount": "Kolimwisa Compte",

    // Theme options
    "theme.violet": "Violet (Par défaut)",
    "theme.blue": "Bleu",
    "theme.green": "Vert",
    "theme.red": "Rouge",
    "theme.orange": "Orange",
    "theme.pink": "Rose",

    // Font size options
    "font.small": "Mokɛ",
    "font.medium": "Katikati",
    "font.large": "Monɛnɛ",
    "font.xlarge": "Monɛnɛ mingi",

    // Placeholders
    "placeholder.email": "email@na.yo.com",
    "placeholder.password": "Mot de passe ya sika",
    "placeholder.timezone": "Africa/Kinshasa",

    // General
    "general.performance": "Performance",
    "general.security": "Sécurité",
    "general.theme": "Theme",
    "general.ago": "kala",
    "general.hours": "baheures",
    "general.save": "Bomba",
    "general.cancel": "Longola",
    "general.yes": "Iyo",
    "general.no": "Te",
    "general.ok": "Ok",
    "general.back": "Mokongo",
    "general.next": "Okoya",
  },
};

/**
 * Custom hook for managing application language.
 * @returns {object} { language, setLanguage, t, availableLanguages }
 */
const useLanguage = () => {
  const [language, setLanguage] = useState("fr");
  const [isLoading, setIsLoading] = useState(true);

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");

    // Valider que la langue sauvegardée est supportée
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setIsLoading(false);
      return;
    }

    // Détecter la langue du navigateur
    const browserLang = navigator.language.split("-")[0];

    // Mapper les codes de langue
    const languageMap = {
      fr: "fr", // Français
      en: "en", // Anglais
      sw: "sw", // Swahili
      ln: "ln", // Lingala
    };

    // Utiliser la langue mappée ou le français par défaut
    const mappedLang = languageMap[browserLang] || "fr";
    setLanguage(mappedLang);
    setIsLoading(false);
  }, []);

  // Sauvegarder la langue dans localStorage quand elle change
  useEffect(() => {
    if (!isLoading && language) {
      localStorage.setItem("appLanguage", language);

      // Mettre à jour l'attribut lang du document
      document.documentElement.lang = language;

      // Toutes les langues sont LTR (Left-to-Right)
      document.documentElement.dir = "ltr";
    }
  }, [language, isLoading]);

  /**
   * Fonction de traduction
   * @param {string} key - Clé de traduction
   * @param {object} params - Paramètres de substitution
   * @returns {string} Texte traduit
   */
  const t = (key, params = {}) => {
    if (!key) return "";

    // Essayer la langue actuelle, puis le français, puis la clé elle-même
    let text = translations[language]?.[key] || translations.fr?.[key] || key;

    // Remplacer les paramètres
    Object.keys(params).forEach((param) => {
      const regex = new RegExp(`{{${param}}}`, "g");
      text = text.replace(regex, params[param]);
    });

    return text;
  };

  // Langues disponibles - seulement 4 langues
  const availableLanguages = [
    {
      code: "fr",
      name: "Français",
      nativeName: "Français",
      flag: "🇫🇷",
      country: "France",
    },
    {
      code: "en",
      name: "English",
      nativeName: "English",
      flag: "🇬🇧",
      country: "United Kingdom",
    },
    {
      code: "sw",
      name: "Swahili",
      nativeName: "Kiswahili",
      flag: "🇹🇿",
      country: "Tanzania",
    },
    {
      code: "ln",
      name: "Lingala",
      nativeName: "Lingála",
      flag: "🇨🇩",
      country: "RD Congo",
    },
  ];

  /**
   * Fonction pour changer de langue
   * @param {string} langCode - Code de langue (fr, en, sw, ln)
   */
  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
      return true;
    }
    console.warn(`Langue non supportée: ${langCode}`);
    return false;
  };

  /**
   * Fonction pour obtenir les informations de la langue actuelle
   */
  const getCurrentLanguageInfo = () => {
    return (
      availableLanguages.find((lang) => lang.code === language) ||
      availableLanguages[0]
    );
  };

  /**
   * Fonction pour vérifier si une clé de traduction existe
   */
  const hasTranslation = (key) => {
    return translations[language]?.[key] !== undefined;
  };

  /**
   * Fonction pour obtenir la liste complète des clés de traduction
   */
  const getAllTranslationKeys = () => {
    return Object.keys(translations.fr); // Utiliser le français comme référence
  };

  /**
   * Fonction pour obtenir les traductions d'une langue spécifique
   */
  const getTranslations = (langCode = language) => {
    return translations[langCode] || {};
  };

  /**
   * Fonction pour formater une date selon la locale
   */
  const formatDate = (date, options = {}) => {
    const localeMap = {
      fr: "fr-FR",
      en: "en-US",
      sw: "sw-TZ",
      ln: "fr-CD", // Utiliser français pour RDC
    };

    const locale = localeMap[language] || "fr-FR";
    return new Date(date).toLocaleDateString(locale, options);
  };

  /**
   * Fonction pour formater un nombre selon la locale
   */
  const formatNumber = (number, options = {}) => {
    const localeMap = {
      fr: "fr-FR",
      en: "en-US",
      sw: "sw-TZ",
      ln: "fr-CD",
    };

    const locale = localeMap[language] || "fr-FR";
    return new Intl.NumberFormat(locale, options).format(number);
  };

  return {
    // État
    language,
    isLoading,

    // Fonctions principales
    setLanguage: changeLanguage,
    t,

    // Informations sur les langues
    availableLanguages,
    currentLanguageInfo: getCurrentLanguageInfo(),

    // Fonctions utilitaires
    hasTranslation,
    getAllTranslationKeys,
    getTranslations,
    formatDate,
    formatNumber,

    // Propriétés dérivées
    isRTL: false, // Toutes les langues sont LTR
    direction: "ltr",

    // Alias pour la compatibilité
    translate: t, // Alias pour t
    changeLang: changeLanguage, // Alias pour setLanguage
  };
};

export default useLanguage;
