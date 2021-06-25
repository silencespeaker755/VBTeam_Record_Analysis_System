import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  inputFrame: {
    height: "100%",
    width: "50px",
    border: 0,
    padding: 0,
    textAlign: "center",
    background: "transparent",
    outlineColor: "#b9803a",
  },
}));

export default function EditableCell({ initialValue, Classes, updateMyData }) {
  const classes = useStyles();
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
    <input
      value={value}
      className={clsx(classes.inputFrame, { [Classes]: !!Classes })}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
