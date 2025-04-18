import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import NewSleepData from "./sleepdata/NewSleepData";
import SleepData from "./sleepdata/SleepData";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <PrivateRoute path="/sleepdata/all" component={SleepData} />
        <PrivateRoute path="/sleepdata/new" component={NewSleepData} />
      </Switch>
    </div>
  );
};

export default MainRouter;
