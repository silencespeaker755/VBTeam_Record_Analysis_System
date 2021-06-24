import React from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

// hompage
import Homepage from "./homepage/Homepage";

// Profile
import Profile from "./profile/Profile";

// Bar
import Bar from "./bar/Bar";

// Sign
import SignIn from "./sign/SignIn";

// Practice

import Practice from "./practice/Practice";
import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Bar />}
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/practice" component={Practice} />
        <Route exact path="/home/profile" component={Profile} />
        <Route exact path="/logout" component={null} />
        <Route exact path="/postlist" component={null} />
      </Switch>
    </>
  );
}
