import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestNewCode } from "../../api/userApi"; // doit contenir l'URL de base de ton API

const ResendActivationCode = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setMessage("Veuillez entrer une adresse e-mail.");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`${requestNewCode}/generate-new-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ JSON
        },
        body: JSON.stringify({ email }), // ✅ {"email":"..."}
      });

      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        setMessage(
          "Un nouveau code d’activation a été envoyé à votre adresse e-mail. Vérifiez votre boîte de réception."
        );
        setIsError(false);
        setEmail("");

        // Redirection après 3 secondes
        setTimeout(() => {
          navigate("/activateAccount");
        }, 3000);
      } else {
        let errorText =
          responseBody?.message ||
          responseBody?.error ||
          `Erreur ${response.status} inconnue.`;

        setMessage(errorText || "Échec de la demande de nouveau code.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Erreur réseau ou inattendue:", error);
      setMessage(
        "Impossible de se connecter au serveur. Veuillez vérifier votre connexion."
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const messageClass = `message ${isError ? "error" : "success"}`;

  return (
    <div className="resend-code-container">
      <h2 className="resend-code-title">🔑 Renvoyer le Code d’Activation</h2>
      <p>
        Veuillez entrer l’adresse e-mail de votre compte pour recevoir un
        nouveau code de validation.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemple@domaine.com"
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Envoi en cours..." : "Recevoir le Nouveau Code"}
        </button>
      </form>

      {message && (
        <div className={messageClass} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default ResendActivationCode;
