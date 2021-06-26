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

export default function EditableTextCeil({
  initialValue,
  label,
  current,
  handleClick,
  handleBlur,
  handleNext,
  editable = true,
  updateMyData,
}) {
  const classes = useStyles();
  const ref = useRef();
  const [value, setValue] = useState(initialValue);
  let index = label.split("-");
  index = index[index.length - 1];

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    handleBlur();
    updateMyData(value);
  };

  useEffect(() => {
    if (current === label) ref.current.focus();
  }, [current]);

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
      onClick={handleClick}
      readOnly={!editable}
    />
  );
}
