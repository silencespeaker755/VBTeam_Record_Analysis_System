import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteModal from "./modal/DeleteModal";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: "20px",
    right: "35px",
  },
}));

export default function DeleteSection({ recordId, refetch }) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setModal(false);
  };

  const handleClick = (e) => {
    if (e) e.stopPropagation();
    setModal(true);
  };

  return (
    <>
      <Fab
        className={classes.root}
        aria-label="delete-match"
        size="small"
        onClick={handleClick}
      >
        <DeleteIcon />
      </Fab>
      <DeleteModal
        open={modal}
        onClose={handleClose}
        recordId={recordId}
        refetch={refetch}
      />
    </>
  );
}
