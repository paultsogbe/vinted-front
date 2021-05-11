import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./container/Home";
import Offer from "./container/Offer";
import Header from "./components/Header";
import Signup from "./container/Signup";
import Login from "./container/Login";
import Publish from "./container/Publish";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  // Fonction qui va permettre :
  // - créer ou supprimer le Cookie qui contient le token
  // - modifier l'état userToken dans le but de rafraîchir Header
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish userToken={userToken} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
