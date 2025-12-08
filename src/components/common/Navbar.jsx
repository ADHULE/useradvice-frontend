import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          MonSite
        </NavLink>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Rechercher..."
            aria-label="Search"
          />
          <button className="btn btn-primary" type="submit">
            Rechercher
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
