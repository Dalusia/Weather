import React from "react";
import { Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "./layouts/RouteWithLayout";
import Home from "./components/Home";
import MainLayout from "./layouts/Main";

const Routes = props => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        path="/home"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
