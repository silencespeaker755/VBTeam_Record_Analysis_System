import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  IconButton,
  createMuiTheme,
  Popover,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MovieIcon from "@material-ui/icons/Movie";
import DescriptionIcon from "@material-ui/icons/Description";
import PollIcon from "@material-ui/icons/Poll";
import { useUserInfo } from "../hooks/useInfo";

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
  notification: {
    padding: "10px",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export default function Menu() {
  const classes = useStyles();
  const history = useHistory();
  const { userInfo } = useUserInfo();
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (bool) => (e) => {
    setOpen(bool);
  };

  const toggleSmallDrawer = (bool) => (e) => {
    setOpenSmall(bool);
  };

  if (userInfo.id === "")
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
          <IconButton color="inherit" onClick={handleClick} component="span">
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
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
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ height: "300px", overflow: "scroll" }}>
          <Typography className={classes.notification}>
            <MovieIcon style={{ paddingRight: "10px" }} /> The content of the
            Popover.
          </Typography>
          <Typography className={classes.notification}>
            <DescriptionIcon style={{ paddingRight: "10px" }} /> The content of
            the Popover.
          </Typography>
          <Typography className={classes.notification}>
            <PollIcon style={{ paddingRight: "10px" }} /> The content of the
            Popover.
          </Typography>
          <Typography className={classes.notification}>
            <PollIcon style={{ paddingRight: "10px" }} /> The content of the
            Popover.
          </Typography>
          <Typography className={classes.notification}>
            <PollIcon style={{ paddingRight: "10px" }} /> The content of the
            Popover.
          </Typography>
          <Typography className={classes.notification}>
            <PollIcon style={{ paddingRight: "10px" }} /> The content of the
            Popover.
          </Typography>
          <Typography className={classes.notification}>
            <PollIcon style={{ paddingRight: "10px" }} /> The content of the
            Popover.
          </Typography>
        </div>
      </Popover>
    </>
  );
}
