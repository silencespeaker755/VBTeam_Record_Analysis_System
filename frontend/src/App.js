import React from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

// hompage
import Homepage from "./homepage/Homepage";

// Bar
import Bar from "./bar/Bar";

import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Bar />}
      <Switch>
        <Route exact path="/" component={null} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/setting" component={null} />
        <Route exact path="/logout" component={null} />
        <Route exact path="/postlist" component={null} />
      </Switch>
    </>
  );
}
