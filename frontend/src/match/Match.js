import React from "react";
import { Container, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../css/Match.css";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "radial-gradient(#2b2b2b, #4e4e4e, #989595, #FFFFFF);",
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
}));

export default function Match() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Link href="/home/record_list" underline="none">
          <div className="btn">
            <span className="text">Data</span>
          </div>
        </Link>
        <Link href="/home/article" underline="none">
          <div className="btn">
            <span className="text">Article</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
