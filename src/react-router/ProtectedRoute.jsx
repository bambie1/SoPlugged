import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, ...rest }) {
  const { currentUser, currentBusiness } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser && currentBusiness ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/my-business",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
