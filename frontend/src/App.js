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

// Practice
import Practice from "./practice/Practice";
import Detail from "./practice/Detail";

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
    if (id && isAdmin) {
      changeUser(id, isAdmin);
      if (history.location.pathname === "/") history.push("/home");
    } else {
      history.push("/");
    }
  }, []);

  return (
    <>
      {location.pathname !== "/" && <Bar />}
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/home/user_list" component={UserList} />
        <Route exact path="/home/match" component={Match} />
        <Route exact path="/home/article" component={Practice} />
        <Route
          exact
          path="/home/article/:articleId"
          render={(props) => <Detail match={props.match} />}
        />
        <Route exact path="/home/record_list" component={RecordList} />
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
        <Route exact path="/home/analysis/my_record" component={MyRecord} />
        {/* <Route exact path="/logout" component={null} /> */}
      </Switch>
    </>
  );
}
