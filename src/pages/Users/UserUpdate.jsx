import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { User, Mail, UserCheck } from "lucide-react";

const UserUpdate = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulation d'un appel API — à remplacer plus tard
    setUser({
      id,
      firstname: "Jean",
      lastname: "Dupont",
      email: "jean.dupont@example.com",
      actif: true,
      roleDto: { name: "ADMIN" },
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Utilisateur mis à jour :", user);
    alert("Utilisateur mis à jour !");
  };

  if (!user) return <p className="loading">Chargement...</p>;

  return (
    <div className="update-container">
      <div className="update-card">
        <h2>Modifier l’utilisateur</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User className="icon" />
            <input
              type="text"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              placeholder="Prénom"
              required
            />
          </div>

          <div className="input-group">
            <User className="icon" />
            <input
              type="text"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              placeholder="Nom"
              required
            />
          </div>

          <div className="input-group">
            <Mail className="icon" />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>

          <div className="toggle-group">
            <label>Actif :</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={user.actif}
                onChange={(e) => setUser({ ...user, actif: e.target.checked })}
              />
              <span className="slider"></span>
            </label>
          </div>

          <button type="submit" className="btn-save">
            Enregistrer <UserCheck size={18} />
          </button>

          <Link to="/users" className="btn-back">
            ← Retour à la liste
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
