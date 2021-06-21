import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, ClickAwayListener, IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

import RightDrawer from "./RightDrawer";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  flex: {
    display: "flex",
  },
}));

export default function Menu() {
  const classes = useStyles();

  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  // data
  const username = "Jason";

  const toggleDrawer = (bool) => (e) => {
    setOpen(bool);
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
    <div className={classes.section}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.flex}>
          <IconButton onClick={() => setType("mails")} component="span">
            <Badge badgeContent={0} color="secondary">
              <MailIcon
                style={{
                  color: type === "mails" ? "#5ace5a" : "white",
                }}
              />
            </Badge>
          </IconButton>
          <IconButton onClick={() => setType("announcements")} component="span">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon
                style={{
                  color: type === "announcements" ? "#5ace5a" : "white",
                }}
              />
            </Badge>
          </IconButton>
        </div>
      </ClickAwayListener>
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
  );
}
