import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Vendors from "../pages/Vendors";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/vendors" component={Vendors} />
    </Switch>
  );
};

export default Routes;
