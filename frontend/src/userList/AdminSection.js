import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import RoleModal from "./modal/RoleModal";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: "10px",
    right: "35px",
  },
}));

export default function AdminSection({ userId, username, refetch }) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setModal(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  return (
    <>
      <Fab
        className={classes.root}
        aria-label="Change-role"
        size="small"
        onClick={handleClick}
      >
        <BuildIcon />
      </Fab>
      <RoleModal
        open={modal}
        onClose={handleClose}
        userId={userId}
        username={username}
        refetch={refetch}
      />
    </>
  );
}
