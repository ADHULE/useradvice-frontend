import React from "react";
import { ShieldCheck, Mail, UserPlus, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

export default function Users() {
  const users = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean@mail.com",
      role: "Admin",
      status: "Actif",
    },
    {
      id: 2,
      name: "Sarah Kongo",
      email: "sarah@mail.com",
      role: "User",
      status: "Actif",
    },
    {
      id: 3,
      name: "Patrick M.",
      email: "patrick@mail.com",
      role: "User",
      status: "Inactif",
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="admin-layout-wrapper">
      <Navbar />
      <div className="admin-flex-container">
        <Sidebar />
        <main className="admin-page users-page">
          {/* HEADER */}
          <header className="page-header">
            <div className="title-group">
              <h1>Répertoire des Utilisateurs</h1>
              <p className="subtitle">
                Consultation des comptes et privilèges.
              </p>
            </div>
          </header>

          {/* TABLE */}
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th className="col-contact">Contact</th>
                  <th className="col-role">Rôle</th>
                  <th className="col-status">Statut</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* IDENTITÉ */}
                    <td className="user-info">
                      <div className="avatar">{getInitials(u.name)}</div>
                      <div className="name-block">
                        <span className="name">{u.name}</span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="user-email">
                      <Mail size={16} className="icon-mail" />
                      <span>{u.email}</span>
                    </td>

                    {/* RÔLE */}
                    <td className="user-role">
                      <span className={`role-tag ${u.role.toLowerCase()}`}>
                        {u.role === "Admin" && <ShieldCheck size={14} />}
                        {u.role}
                      </span>
                    </td>

                    {/* STATUT */}
                    <td className="user-status">
                      <span
                        className={`status-indicator ${u.status.toLowerCase()}`}
                      >
                        {u.status === "Actif" ? (
                          <UserCheck size={14} />
                        ) : (
                          <UserX size={14} />
                        )}
                        {u.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
