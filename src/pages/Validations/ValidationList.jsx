// src/pages/Validation/ValidationList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ValidationList = () => {
  const [validations, setValidations] = useState([]);
  const api = null;
  useEffect(() => {
    api
      .get("/validations")
      .then((res) => setValidations(res.data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  return (
    <div className="validation-list-container">
      <h2>Liste des validations</h2>

      <table className="validation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Créée</th>
            <th>Expire</th>
            <th>Utilisateur</th>
            <th>Détails</th>
          </tr>
        </thead>

        <tbody>
          {validations.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.code}</td>
              <td>{new Date(v.creationTime).toLocaleString()}</td>
              <td>{new Date(v.expireTime).toLocaleString()}</td>
              <td>
                {v.userDto?.firstname} {v.userDto?.lastname}
              </td>
              <td>
                <Link to={`/validations/${v.id}`} className="btn-detail">
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidationList;
