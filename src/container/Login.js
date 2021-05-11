import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // requête axios pour se loguer
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        // Enregistrer le token dans un Cookie
        setUser(response.data.token);
        // Rediriger vers la page Home
        history.push("/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="signup">
        <h3>Se connecter</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <input
            className="input"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
          <span>{errorMessage}</span>
          <input className="submit-signup" type="submit" value="Se connecter" />
        </form>
      </div>
    </div>
  );
};

export default Login;
