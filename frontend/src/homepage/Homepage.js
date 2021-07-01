import React, { useState, useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useInView } from "react-intersection-observer";
import ScrollTopButton from "../components/ScrollTopButton";
import Calendar from "./Calendar";
import AlertModel from "../components/AlertModel";

export default function Homepage() {
  const [alertModel, setAlertModel] = useState(false);

  const [ref, inView] = useInView();

  const errMessage = {
    title: "Access Fail",
    message: "There is something wrong during request.",
  };

  useEffect(() => {
    document.title = "Volleyball Club House";
  }, []);

  return (
    <>
      <div ref={ref} id="back-to-top-anchor" />
      <Calendar showErrorModel={() => setAlertModel(true)} />
      <ScrollTopButton inView={inView}>
        <Fab
          aria-label="scroll back to top"
          size="small"
          style={{ backgroundColor: "#ffc800" }}
        >
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
