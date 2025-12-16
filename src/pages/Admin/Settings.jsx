import React, { useState } from "react";
import { Bell, Palette, Save } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="admin-layout-wrapper">
          <div className="admin-main-container">
            <main className="admin-page settings-page">
              <header className="page-header">
                <h1>Réglages Système</h1>
                <p className="subtitle">
                  Configurez les préférences globales de votre interface.
                </p>
              </header>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="settings-card"
              >
                {/* Section Apparence */}
                <div className="settings-section">
                  <h3>
                    <Palette size={20} /> Apparence
                  </h3>
                  <div className="setting-row">
                    <div className="setting-info">
                      <p className="label">Mode sombre</p>
                      <p className="description">
                        Activer une interface à faible luminosité.
                      </p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        aria-label="Activer le mode sombre"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                {/* Section Communications */}
                <div className="settings-section">
                  <h3>
                    <Bell size={20} /> Communications
                  </h3>
                  <div className="setting-row">
                    <div className="setting-info">
                      <p className="label">Notifications Push</p>
                      <p className="description">
                        Recevoir des alertes lors de nouveaux avis.
                      </p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        aria-label="Activer les notifications"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <button className="save-btn">
                  <Save size={18} />
                  Enregistrer les modifications
                </button>
              </motion.div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
