import React from "react";
import { Typography } from "@material-ui/core";

const mappingArrayToText = (array, customClass = null) => {
  if (array.length === 0 || (array.length === 1 && array[0] === ""))
    return (
      <Typography variant="body1" component="p" className={customClass}>
        &nbsp;none
      </Typography>
    );
  return array.map((el, i, all) => {
    return (
      <Typography
        key={`${i}+${el}`}
        variant="body1"
        component="p"
        className={customClass}
      >
        &nbsp;{el}
      </Typography>
    );
  });
};

export default mappingArrayToText;
