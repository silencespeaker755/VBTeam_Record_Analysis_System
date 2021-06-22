import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, ClickAwayListener, IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EqualizerIcon from "@material-ui/icons/Equalizer";

import RightDrawer from "./RightDrawer";
import RightSmallDrawer from "./RightSmallDrawer";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  smallSection: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
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
                <MailIcon
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
              <Badge badgeContent={1} color="secondary">
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
          onClick={() => history.push("/home")} // TODO: link to analysis
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
