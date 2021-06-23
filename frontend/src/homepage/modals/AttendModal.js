import React from "react";
import { Button } from "@material-ui/core";
import AlertModel from "../../components/AlertModel";

export default function AttendModal(props) {
  const { open, event, onClose } = props;
  const { title, extendedProps = {} } = event;
  const {
    place = "",
    attendance = [],
    notes: notesString = "",
  } = extendedProps;
  return (
    <AlertModel
      open={open}
      alertTitle={`${title}`}
      alertDesciption={`Success! You will attend to ${title} in ${place}.`}
      alertButton={<Button onClick={onClose}>Got it!</Button>}
      onClose={onClose}
    />
  );
}
