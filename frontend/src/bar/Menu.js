import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  ClickAwayListener,
  IconButton,
  createMuiTheme,
  Popover,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MovieIcon from "@material-ui/icons/Movie";
import DescriptionIcon from "@material-ui/icons/Description";
import PollIcon from "@material-ui/icons/Poll";
import EventIcon from "@material-ui/icons/Event";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import instance from "../setting";
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
    width: "15%",
    justifyContent: "space-around",
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
    borderRadius: "5px",
    padding: "10px",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
      background: "#Efefef",
    },
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
  icon: {
    paddingRight: "10px",
  },
  popoverBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "5px",
  },
  popoverItem: {
    height: "290px",
    overflow: "auto",
    minWidth: "200px",
    borderRadius: "0.25",
  },
  clearBtn: {
    marginTop: "5px",
    height: "30px",
  },
}));
const linkDir = {
  video: "/home/posts/",
  article: "/home/posts/",
  record: "/home/record/",
};

export default function Menu() {
  const classes = useStyles();
  const history = useHistory();
  const { userInfo } = useUserInfo();
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState([]);
  const [openSmall, setOpenSmall] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [focus, setFocus] = useState(false);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const toggleDrawer = (bool) => (e) => {
    setOpen(bool);
  };

  const toggleSmallDrawer = (bool) => (e) => {
    setOpenSmall(bool);
  };

  const {
    data: notification = [],
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useQuery(
    "NotificationFetching",
    async () => {
      const data = await instance.get("/api/home/notifications", {
        params: {
          userId: localStorage.getItem("id"),
        },
      });
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: ({ data }) => {
        setNotify(data);
      },
      onError: (err) => {},
    }
  );

  const deleteNotify = useMutation(
    async () => {
      await instance.post("/api/home/notifications/delete", {
        userId: localStorage.getItem("id"),
      });
    },
    {
      onSuccess: () => {
        refetchEvents();
      },
      onError: () => {},
    }
  );

  const handleClick = (event) => {
    setFocus(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const clearNotify = () => {
    deleteNotify.mutate();
  };

  const noticon = (type) => {
    switch (type) {
      case "video":
        return <MovieIcon className={classes.icon} />;
      case "article":
        return <DescriptionIcon className={classes.icon} />;
      case "record":
        return <PollIcon className={classes.icon} />;
      default:
        return <EventIcon className={classes.icon} />;
    }
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
          <AccountCircleIcon style={{ fontSize: 33 }} />
        </IconButton>
      </div>
    );
  return (
    <>
      <div className={classes.section}>
        {/* <div className={classes.flex}> */}
        <IconButton
          color="inherit"
          onClick={() => history.push("/home/user_list")}
          component="span"
        >
          <PeopleIcon style={{ fontSize: 35 }} />
        </IconButton>
        <ClickAwayListener onClickAway={() => setFocus(false)}>
          <IconButton color="inherit" onClick={handleClick} component="span">
            <Badge badgeContent={notify.length} color="secondary">
              <NotificationsIcon
                style={{
                  color: focus ? "#eb9e23" : "white",
                  fontSize: 33,
                }}
              />
            </Badge>
          </IconButton>
        </ClickAwayListener>
        <IconButton
          edge="end"
          onClick={toggleDrawer(true)}
          color="inherit"
          component="span"
        >
          <AccountCircleIcon style={{ fontSize: 33 }} />
        </IconButton>
      </div>

      <RightDrawer open={open} toggleDrawer={toggleDrawer} />
      {/* </div> */}
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
        <div className={classes.popoverBox}>
          <div className={classes.popoverItem}>
            {notify.map((el, index) => {
              return el.type === "event" ? (
                <>
                  <Typography
                    key={`${index}+${el}`}
                    className={classes.notification}
                  >
                    {noticon(el.type)}
                    {`${el.uploader} 上傳了一${
                      el.type === "record" ? "個比賽紀錄" : "個練球事件"
                    }`}
                    &nbsp;&nbsp;
                    <small>{`${moment(el.uploadTime).format(
                      "YYYY-MM-DD hh:mm"
                    )}`}</small>
                  </Typography>
                  <Divider />
                </>
              ) : (
                <Link
                  to={`${linkDir[el.type]}${el.id}`}
                  className={classes.link}
                >
                  <>
                    <Typography
                      key={`${index}+${el}`}
                      className={classes.notification}
                    >
                      {noticon(el.type)}
                      {`${el.uploader} 上傳了一${
                        el.type === "video" ? "支影片" : "篇文章"
                      }`}
                      &nbsp;&nbsp;
                      <small>{`${moment(el.uploadTime).format(
                        "YYYY-MM-DD hh:mm"
                      )}`}</small>
                    </Typography>
                    <Divider />
                  </>
                </Link>
              );
            })}
          </div>
          <Button
            variant="outlined"
            className={classes.clearBtn}
            onClick={clearNotify}
          >
            Clear
          </Button>
        </div>
      </Popover>
    </>
  );
}
