import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useUserInfo } from "../../hooks/useInfo";
import DeleteModal from "./DeleteModal";
import "../../css/Card.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    width: "100%",
    padding: 0,
  },
  frame: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 6),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  posUp: {
    marginTop: 4,
  },
}));

export default function EventModal(props) {
  const {
    open,
    event,
    handleClose,
    showEventModal,
    showErrorModel,
    setLoading,
    refetchEvents,
  } = props;
  const classes = useStyles();
  const { userInfo } = useUserInfo();
  const [openDelete, setOpenDelete] = useState(false);
  const { start, end, title, extendedProps = {} } = event;
  const {
    _id = "",
    place = "",
    attendance = [],
    notes: notesString = "",
  } = extendedProps;
  const notes = notesString.split("\n");
  const date = moment(start).format("YYYY-MM-DD");
  const startTime = moment(start).format("YYYY-MM-DD hh:mm:ss");
  const endTime = moment(end).format("YYYY-MM-DD hh:mm:ss");

  const handleDelete = () => {
    setOpenDelete(true);
    handleClose();
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    showEventModal();
  };

  const handleDeleteOk = () => {
    setOpenDelete(false);
    handleClose();
  };

  const mappingArrayToText = (array) => {
    if (array.length === 0 || (array.length === 1 && array[0] === ""))
      return (
        <Typography variant="body2" component="p">
          &nbsp;none
        </Typography>
      );
    return array.map((el, i, all) => {
      return (
        <Typography key={el} variant="body2" component="p">
          &nbsp;{el}
        </Typography>
      );
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {date}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Start time : {startTime}
              </Typography>
              {end && (
                <Typography
                  className={(classes.pos, classes.title)}
                  color="textSecondary"
                >
                  End time : {endTime}
                </Typography>
              )}
              <Typography
                variant="body2"
                component="p"
                display="inline"
                className={classes.bold}
              >
                Address:
              </Typography>
              <Typography variant="body2" component="p" display="inline">
                &nbsp;&nbsp;{place}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={(classes.posUp, classes.bold)}
              >
                Notes:
              </Typography>
              {mappingArrayToText(notes)}
              <Typography
                variant="body2"
                component="p"
                className={(classes.posUp, classes.bold)}
              >
                Attendances:
              </Typography>
              {mappingArrayToText(attendance)}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClose}>
                Got it
              </Button>
              {userInfo.isAdmin && (
                <Button size="small" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
      <DeleteModal
        open={openDelete}
        date={date}
        title={title}
        eventId={_id}
        handleOk={handleDeleteOk}
        onClose={handleDeleteClose}
        showErrorModel={showErrorModel}
        setLoading={setLoading}
        refetchEvents={refetchEvents}
      />
    </>
  );
}
