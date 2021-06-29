import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserInfoProvider } from "./hooks/useInfo";
import { DateInfoProvider } from "./hooks/useDate";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <UserInfoProvider>
      <DateInfoProvider>
        <QueryClientProvider client={queryClient}>
          <Router basename={process.env.PUBLIC_URL}>
            <App />
          </Router>
        </QueryClientProvider>
      </DateInfoProvider>
    </UserInfoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
