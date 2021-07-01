import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Button, Fab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: (props) => (props.bottom ? `${props.bottom}px` : theme.spacing(2)),
    right: (props) => (props.right ? `${props.right}px` : theme.spacing(2)),
    width: (props) => (props.height ? `${props.height}px` : "40px"),
    height: (props) => (props.width ? `${props.width}px` : "40px"),
  },
}));

export default function DetailButton(props) {
  const { openModal, height, width, bottom, right } = props;
  const classes = useStyles(props);

  return (
    <div onClick={openModal} className={classes.root}>
      <Fab
        aria-label="scroll back to top"
        size="small"
        style={{
          backgroundColor: "#ffc800",
          height: `${height}px`,
          width: `${width}px`,
        }}
      >
        <AssignmentIcon
          style={{ height: `${height - 30}px`, width: `${width - 30}px` }}
        />
      </Fab>
    </div>
  );
}
