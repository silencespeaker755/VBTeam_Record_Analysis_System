import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useInView } from "react-intersection-observer";
import { Button, Fab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  top: {
    width: (props) => (props.height ? `${props.height}px` : "40px"),
    height: (props) => (props.width ? `${props.width}px` : "40px"),
    position: "fixed",
    right: "18px",
    bottom: "72px",
    padding: 0,
  },
  root: {
    position: "fixed",
    bottom: (props) => (props.bottom ? `${props.bottom}px` : theme.spacing(2)),
    right: (props) => (props.right ? `${props.right}px` : theme.spacing(2)),
    width: (props) => (props.height ? `${props.height}px` : "40px"),
    height: (props) => (props.width ? `${props.width}px` : "40px"),
  },
}));

export default function AddButton(props) {
  const { inView, openModal, height, width, bottom, right } = props;
  const classes = useStyles(props);

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div onClick={openModal} className={inView ? classes.root : classes.top}>
      <Fab
        aria-label="scroll back to top"
        size="small"
        style={{
          backgroundColor: "#ffc800",
          height: `${height}px`,
          width: `${width}px`,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
