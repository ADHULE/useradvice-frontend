// src/pages/Validation/ValidationDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ValidationDetail = () => {
  const { id } = useParams();
  const [validation, setValidation] = useState(null);
  const api = null;
  useEffect(() => {
    api
      .get(`/validations/${id}`)
      .then((res) => setValidation(res.data))
      .catch((err) => console.error("Erreur :", err));
  }, [id]);

  if (!validation) return <p>Chargement...</p>;

  return (
    <div className="validation-detail-container">
      <h2>Détail de la validation #{validation.id}</h2>

      <div className="validation-card">
        <p>
          <strong>Code :</strong> {validation.code}
        </p>
        <p>
          <strong>Création :</strong>{" "}
          {new Date(validation.creationTime).toLocaleString()}
        </p>
        <p>
          <strong>Activation :</strong>{" "}
          {validation.activationTime
            ? new Date(validation.activationTime).toLocaleString()
            : "Non activée"}
        </p>
        <p>
          <strong>Expiration :</strong>{" "}
          {new Date(validation.expireTime).toLocaleString()}
        </p>

        <h3>Utilisateur associé</h3>
        <p>
          <strong>Nom :</strong> {validation.userDto?.firstname}{" "}
          {validation.userDto?.lastname}
        </p>
        <p>
          <strong>Email :</strong> {validation.userDto?.email}
        </p>
        <p>
          <strong>Rôle :</strong> {validation.userDto?.roleDto?.name}
        </p>

        <Link to="/validations" className="btn-back">
          Retour
        </Link>
      </div>
    </div>
  );
};

export default ValidationDetail;
