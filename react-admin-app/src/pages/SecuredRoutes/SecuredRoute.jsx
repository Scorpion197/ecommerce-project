import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthHelper from "../../Helpers";

const SecuredRoute = (props) => {
  const helper = new AuthHelper();
  const isAuthenticated = helper.isAuthenticated();

  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <Route
      path={props.path}
      render={(data) =>
        isAuthenticated ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to="/sign-in"></Redirect>
        )
      }
    ></Route>
  );
};

export default SecuredRoute;
