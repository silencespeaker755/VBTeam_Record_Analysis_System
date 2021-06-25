import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inputFrame: {
    height: "100%",
    minWidth: "24ch",
    border: 0,
    padding: "0 0 0 5px",
    textAlign: "left",
    background: "transparent",
    outlineColor: "#b9803a",
  },
}));

export default function EditableTextCeil({ initialValue, updateMyData }) {
  const classes = useStyles();
  const ref = useRef();
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <textarea
      ref={ref}
      value={value}
      className={classes.inputFrame}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
