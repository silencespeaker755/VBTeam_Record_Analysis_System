import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

// hompage
import Homepage from "./homepage/Homepage";

// Profile
import Profile from "./profile/Profile";

// UserList
import UserList from "./userList/UserList";

// Bar
import Bar from "./bar/Bar";

// Sign
import SignIn from "./sign/SignIn";
import Authentication from "./sign/Authentication";

// Posts
import Posts from "./posts/Posts";
import Detail from "./posts/Detail";

// Match
import Match from "./match/Match";

// My Analysis
import MyRecord from "./my_record/MyRecord";

// RecordList
import RecordList from "./recordList/RecordList";

// Record
import Record from "./record/Record";
import "./App.css";

import { useUserInfo } from "./hooks/useInfo";

export default function App() {
  const location = useLocation();
  const history = useHistory();
  const { changeUser } = useUserInfo();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const id = localStorage.getItem("id");
    const auth = localStorage.getItem("auth");
    if (id && isAdmin) {
      changeUser(id, isAdmin === "true", auth === "true");
      if (auth === "true") {
        if (
          history.location.pathname === "/" ||
          history.location.pathname === "/auth"
        )
          history.push("/home");
      } else {
        history.push("/auth");
      }
    } else {
      history.push("/");
    }
  }, []);

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/auth" && <Bar />}
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/home/user_list" component={UserList} />
        <Route exact path="/home/match" component={Match} />
        <Route exact path="/home/posts" component={Posts} />
        <Route
          exact
          path="/home/posts/:articleId"
          render={(props) => <Detail match={props.match} />}
        />
        <Route exact path="/home/records" component={RecordList} />
        <Route
          exact
          path="/home/record/:recordId"
          render={(props) => <Record match={props.match} />}
        />
        <Route
          exact
          path="/home/profile/:userId"
          render={(props) => <Profile match={props.match} />}
        />
        <Route
          exact
          path="/home/analysis/:userId"
          render={(props) => <MyRecord match={props.match} />}
        />
        <Route exact path="/auth" component={Authentication} />
      </Switch>
    </>
  );
}
