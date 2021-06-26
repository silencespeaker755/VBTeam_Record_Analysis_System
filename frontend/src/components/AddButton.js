import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useInView } from "react-intersection-observer";
import { Button, Fab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  top: {
    width: "40px",
    height: "40px",
    position: "fixed",
    right: "18px",
    bottom: "72px",
    padding: 0,
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function AddButton({ inView, openModal }) {
  const classes = useStyles();

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
        style={{ backgroundColor: "#ffc800" }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
