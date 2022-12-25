import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";
import Subscriptions from "./pages/Subscriptions";
import SecuredRoute from "./pages/SecuredRoutes/SecuredRoute";
import Vendors from "./pages/Vendors";

const LayoutVendors = () => {
  return (
    <Layout>
      <Vendors />
    </Layout>
  );
};

const LayoutHome = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

const LayoutSubscription = () => {
  return (
    <Layout>
      <Subscriptions />
    </Layout>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>

          <SecuredRoute path="/" component={LayoutHome} />
          <SecuredRoute path="/subscriptions" component={LayoutSubscription} />
          <SecuredRoute path="/vendors" component={LayoutVendors} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
