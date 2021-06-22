import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListIcon from "@material-ui/icons/List";
import MovieIcon from "@material-ui/icons/Movie";

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
      //   "& .MuiListItemIcon-root": {
      //     color: "white",
      //   },
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
  link: {
    textDecoration: "none",
  },
}));

export default function RightDrawer(props) {
  const { open, toggleDrawer } = props;
  const classes = useStyle();

  const [admin, setAdmin] = useState(true);

  const menuList = [
    {
      label: "My account",
      icon: <AccountCircleIcon />,
      link: `/home`,
      event: null,
      visible: admin,
    },
    {
      label: "My Post",
      icon: <AssignmentIcon />,
      link: `/home`,
      event: null,
      visible: admin,
    },
    {
      label: "My Vedio",
      icon: <MovieIcon />,
      link: `/home`,
      event: null,
      visible: admin,
    },
    {
      label: "Broadcast",
      icon: <OpenInNewIcon />,
      link: "/",
      event: null,
      visible: admin,
    },
  ];

  return (
    <Drawer
      anchor="right"
      className={classes.flex}
      PaperProps={{ style: { backgroundColor: "#757575" } }}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <div className={classes.list} onClick={() => toggleDrawer(false)}>
        <div className={classes.listItems}>
          <List>
            {menuList.map((item) => (
              <Link
                to={item.link}
                key={item.label}
                className={clsx(classes.link, {
                  [classes.notAdmin]: !item.visible,
                })}
                onClick={item.event}
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
        <Link to="/" className={classes.link} onClick={() => {}}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.white}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText className={classes.white} primary="log out" />
          </ListItem>
        </Link>
      </div>
    </Drawer>
  );
}
