import React from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTopButton from "./ScrollTopButton";
import Calendar from "./Calendar";

export default function Homepage() {
  return (
    <>
      <div id="back-to-top-anchor" />
      <Calendar />
      <ScrollTopButton>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
    </>
  );
}
