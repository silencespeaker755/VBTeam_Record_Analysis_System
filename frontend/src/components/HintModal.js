import React from "react";
import { Button } from "@material-ui/core";
import AlertModel from "./AlertModel";

export default function HintModal({ open, onClose, message }) {
  return (
    <AlertModel
      open={open}
      alertTitle=""
      alertDesciption={message}
      alertButton={
        <div>
          <Button onClick={onClose}>Got it</Button>
        </div>
      }
      onClose={onClose}
    />
  );
}
