import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";
import GhostMe from "./pages/GhostMe";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/assistant/onboard" component={Onboarding} /> */
        <ProtectedRoute path="/assistant/chat" component={GhostMe} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
