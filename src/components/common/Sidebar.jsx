import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes"; // fichier de routes

const Sidebar = ({ user }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
        {user && <p>Bonjour, {user.name}</p>}
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to={ROUTES.HOME}>Accueil</Link>
          </li>
          <li>
            <Link to={ROUTES.REVIEWS}>Avis Utilisateurs</Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT}>À propos</Link>
          </li>
          <li>
            <Link to={ROUTES.CONTACT}>Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <small>© {new Date().getFullYear()} SYSTEME ADHULE</small>
      </div>
    </aside>
  );
};

export default Sidebar;
