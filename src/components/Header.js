import { Link, Redirect } from "react-router-dom";
import Logo from "./logo.png";

const Header = ({ userToken, setUser }) => {
  return (
    <div className="Header">
      <div className="Logo">
        <img alt="Logo" src={Logo} />
      </div>
      {/* {userToken ? (
        <button onClick={() => setUser(null)}>Se déconnecter</button>
      ) : (
        <Redirect to="/login" />
      )} */}
      <div className="Buttons">
        {userToken ? (
          <button
            className="button"
            style={{ backgroundColor: "white" }}
            onClick={() => setUser(null)}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link className="button" to="/signup">
              S'inscrire
            </Link>
            <Link className="button" to="/login">
              Se connecter
            </Link>
          </>
        )}
        <Link className="publish" to="/publish">
          Vends tes articles
        </Link>
      </div>
    </div>
  );
};

export default Header;
