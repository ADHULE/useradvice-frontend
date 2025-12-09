import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestNewCode } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";
import Footer from "../../components/common/Footer";

const ResendActivationCode = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      //  Appel à Axios via la fonction requestNewCode
      // const response = await requestNewCode({ email });

      setMessage(
        "Un nouveau code d’activation a été envoyé à votre adresse e-mail. Vérifiez votre boîte de réception."
      );
      setIsError(false);
      setEmail("");

      // Redirection après 3 secondes
      setTimeout(() => {
        goToPath("/activateAccount");
      }, 3000);
    } catch (err) {
      console.error("Erreur de demande de nouveau code :", err);

      const errorText =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Échec de la demande de nouveau code.";
      setMessage(errorText);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const messageClass = `message ${isError ? "error" : "success"}`;

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h2> Renvoyer le Code d’Activation</h2>
          <p>
            Veuillez entrer l’adresse e-mail de votre compte pour recevoir un
            nouveau code de validation.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group with-icon">
              <input
                type="email"
                placeholder="exemple@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Recevoir le Nouveau Code"}
            </button>
          </form>

          {message && (
            <div className={messageClass} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResendActivationCode;
