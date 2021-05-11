import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      // console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        setErrorMessage("Une erreur est survenue.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email possède déjà un compte");
      } else {
        setErrorMessage("Une erreur est survenue.");
      }
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <div className="signup">
        <h3>S'inscrire</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <br />
          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <br />
          <input
            type="checkbox"
            value="S'inscrire à notre Newsletter"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
          <br />
          <br />
          <span>{errorMessage}</span>
          <input className="submit-signup" type="submit" value="S'inscrire" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
