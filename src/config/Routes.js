import React from "react";

import { Route, Switch } from "react-router-dom";

import Catalog from "../pages/Catalog/Catalog";
import Detail from "../pages/Detail/Detail";
import Profile from "../pages/Profile/Profile";
import HomeScreen from "../pages/Home/HomeScreen";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/:category/search/:keyword"
        component={Catalog}
      />
      <Route
        path="/:category/:id"
        component={Detail}
      />
      <Route
        path="/:category"
        component={Catalog}
      />
      <Route
        path="/"
        exact
        component={HomeScreen}
      />
      <Route
        path="/profile"
        component={Profile}
      />
    </Switch>
  );
};

export default Routes;
