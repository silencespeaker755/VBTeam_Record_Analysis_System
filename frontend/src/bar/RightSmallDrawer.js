import React, { useState } from "react";
import {
  Link,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListIcon from "@material-ui/icons/List";
import MovieIcon from "@material-ui/icons/Movie";
import PeopleIcon from "@material-ui/icons/People";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { useUserInfo } from "../hooks/useInfo";

const useStyle = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
  list: {
    position: "relative",
    display: "flex",
    overflow: "auto",
    flexGrow: 1,
  },
  listItems: {
    width: "250px",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#9e9e9e",
      color: "white",
    },
  },
  notAdmin: {
    display: "none",
  },
  width_100: {
    width: "100%",
  },
  white: {
    color: "white",
  },
}));

export default function RightSmallDrawer(props) {
  const { open, toggleDrawer } = props;
  const classes = useStyle();
  const { userInfo } = useUserInfo();
  const [admin, setAdmin] = useState(true);

  const menuList = [
    {
      label: "My account",
      icon: <AccountCircleIcon />,
      link: `/home/profile/${userInfo.id}`,
      event: null,
      visible: true,
    },
    {
      label: "My Records",
      icon: <AssignmentIcon />,
      link: `/home/analysis/my_record`,
      event: null,
      visible: userInfo.isAdmin,
    },
    {
      label: "My Videos",
      icon: <MovieIcon />,
      link: `/home`,
      event: null,
      visible: userInfo.isAdmin,
    },
    {
      label: "Analysis",
      icon: <EqualizerIcon />,
      link: "/home/record_list",
      event: null,
      visible: admin,
    },
    {
      label: "Notification",
      icon: <NotificationsIcon />,
      link: "/home",
      event: null,
      visible: admin,
    },
    {
      label: "People",
      icon: <PeopleIcon />,
      link: "/home",
      event: null,
      visible: admin,
    },
    {
      label: "Matches",
      icon: <OpenInNewIcon />,
      link: "/home/match",
      event: null,
      visible: admin,
    },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} color="inherit" component="span">
        <Badge badgeContent="3" color="secondary">
          <MoreVertIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        className={classes.flex}
        PaperProps={{ style: { backgroundColor: "#757575" } }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.list} onClick={toggleDrawer(false)}>
          <div className={classes.listItems}>
            <List>
              {menuList.map((item) => (
                <Link
                  href={item.link}
                  key={item.label}
                  className={clsx(classes.link, {
                    [classes.notAdmin]: !item.visible,
                  })}
                  onClick={item.event}
                  underline="none"
                >
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.white}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={classes.white}
                      primary={item.label}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </div>
        <div className={classes.width_100} onClick={toggleDrawer(false)}>
          <Link
            href="/"
            className={classes.link}
            onClick={handleLogOut}
            underline="none"
          >
            <ListItem className={classes.listItem} button>
              <ListItemIcon className={classes.white}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText className={classes.white} primary="log out" />
            </ListItem>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
