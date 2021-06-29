import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../css/Match.css";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#FFFFFF",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "calc(100vh - 64px)",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "500px",
    minWidth: "400px",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Match() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Link to="/home/records" className={classes.link}>
          <div className="leftbtn">
            <span className="text">Records</span>
          </div>
        </Link>
        <Link to="/home/analysis" className={classes.link}>
          <div className="rightbtn">
            <span className="text">Analysis</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
