import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  ClickAwayListener,
  IconButton,
  createMuiTheme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EqualizerIcon from "@material-ui/icons/Equalizer";

import RightDrawer from "./RightDrawer";
import RightSmallDrawer from "./RightSmallDrawer";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles(() => ({
  section: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  smallSection: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  flex: {
    display: "flex",
  },
}));

export default function Menu() {
  const classes = useStyles();
  const history = useHistory();

  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

  // data
  const username = "Jason";

  const toggleDrawer = (bool) => (e) => {
    setOpen(bool);
  };

  const toggleSmallDrawer = (bool) => (e) => {
    setOpenSmall(bool);
  };

  const handleClickAway = () => {
    setType("");
  };

  if (!username)
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
      </div>
    );
  return (
    <>
      <div className={classes.section}>
        <div className={classes.flex}>
          <IconButton
            color="inherit"
            onClick={() => history.push("/home/user_list")}
            component="span"
          >
            <PeopleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => {}} component="span">
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
        <IconButton
          edge="end"
          onClick={() => history.push("/home/record_list")}
          color="inherit"
          component="span"
        >
          <EqualizerIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={toggleDrawer(true)}
          color="inherit"
          component="span"
        >
          <AccountCircleIcon />
        </IconButton>
        <RightDrawer open={open} toggleDrawer={toggleDrawer} />
      </div>
      <div className={classes.smallSection}>
        <RightSmallDrawer open={openSmall} toggleDrawer={toggleSmallDrawer} />
      </div>
    </>
  );
}
