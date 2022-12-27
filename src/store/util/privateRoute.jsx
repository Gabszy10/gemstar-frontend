/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [redirectPath, setRedirectPath] = useState(
    props.redirectPath || "/login"
  );

  useEffect(() => {
    props
      .accessFunction()
      .then((result) => {
        setIsAuthorized(result);
        setLoaded(true);
      })
      .catch((err) => {
        setIsAuthorized(false);
        setLoaded(true);
        setRedirectPath("/login");
      });
  }, [props.path]);
  return (
    <>
      {loaded && (
        <Route {...rest}>
          {(props) =>
            isAuthorized ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: redirectPath,
                  state: { from: props.location },
                }}
              />
            )
          }
        </Route>
      )}
    </>
  );
};

export default PrivateRoute;
