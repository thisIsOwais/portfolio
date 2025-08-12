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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        {/* <Route path="/assistant/onboard" component={Onboarding} /> */ }
        {/* <ProtectedRoute path="/assistant/chat" component={GhostMe} /> */}
        <Route path="/assistant/chat" component={GhostMe} />
        <Redirect to="/" />
      </Switch>
    </Router>
    <ToastContainer
        position="top-right"
        hideProgressBar
        closeOnClick={false}
        draggable={false}
        pauseOnHover
        autoClose={3000}
        theme="dark" // important: removes white bg
        style={{ background: "transparent" }} // removes container white bg
      />

    </>
  );
}

export default App;
