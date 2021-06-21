import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function Menu() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <IconButton
        edge="end"
        onClick={() => {}}
        color="inherit"
        component="span"
      >
        <AccountCircleIcon />
      </IconButton>
      {/* Drawer */}
    </div>
  );
}
