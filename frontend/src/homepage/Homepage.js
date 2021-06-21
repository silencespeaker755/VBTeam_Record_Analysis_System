import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTopButton from "./ScrollTopButton";
import Calendar from "./Calendar";
import AlertModel from "../components/AlertModel";

export default function Homepage() {
  const [alertModel, setAlertModel] = useState(false);

  const errMessage = {
    title: "Access Fail",
    message: "There is something wrong during request.",
  };

  return (
    <>
      <div id="back-to-top-anchor" />
      <Calendar showErrorModel={() => setAlertModel(true)} />
      <ScrollTopButton>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
      <AlertModel
        open={alertModel}
        alertTitle={errMessage.title}
        alertDesciption={errMessage.message}
        alertButton={
          <Button
            onClick={() => {
              setAlertModel(false);
            }}
          >
            Got it!
          </Button>
        }
        onClose={() => {
          setAlertModel(false);
        }}
      />
    </>
  );
}
