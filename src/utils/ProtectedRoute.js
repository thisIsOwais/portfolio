import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const isOnboarded = !!localStorage.getItem("ghost-user");

  return (
    <Route
      {...rest}
      render={(props) =>
        isOnboarded ? (
          <Component {...props} />
        ) : (
          <Redirect to="/assistant/onboard" />
        )
      }
    />
  );
};

export default ProtectedRoute;
