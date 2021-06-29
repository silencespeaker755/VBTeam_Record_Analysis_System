import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, InputBase, Toolbar, Typography } from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import { useDateInfo } from "../hooks/useDate";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    zIndex: 1000,
    background: "#2E3B55",
  },
  title: {
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
      marginRight: "20px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "15px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "18ch",
      "&:focus": {
        width: "36ch",
      },
    },
    [`@media screen and (min-width: 600px) and (max-width: 960px)`]: {
      width: "18ch",
      "&:focus": {
        width: "36ch",
      },
    },
  },
  offset: theme.mixins.toolbar,
  scrollTopButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Bar() {
  const classes = useStyles();
  const { changeDate } = useDateInfo();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      changeDate(e.target.value);
      setSearchInput("");
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          <Link to="/home" className={classes.link}>
            <Typography className={classes.title} variant="h6" noWrap>
              Volleyball Playground
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="YYYY-MM-DD"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyUp={handleSearch}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
          <div className={classes.grow} />
          <Menu />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
