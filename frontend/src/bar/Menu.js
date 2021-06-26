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
        {/* Drawer */}
      </div>
    );
  return (
    <>
      <div className={classes.section}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.flex}>
            <IconButton onClick={() => setType("mails")} component="span">
              <Badge badgeContent={0} color="secondary">
                <VideoLibraryIcon
                  style={{
                    color: type === "mails" ? "#ffb200" : "white",
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => setType("announcements")}
              component="span"
            >
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon
                  style={{
                    color: type === "announcements" ? "#ffb200" : "white",
                  }}
                />
              </Badge>
            </IconButton>
          </div>
        </ClickAwayListener>
        <IconButton
          edge="end"
          onClick={() => history.push("/home/record_list")} // TODO: link to analysis
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
