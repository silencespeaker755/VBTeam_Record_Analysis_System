import React, { useState, useEffect, useRef } from "react";
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

export default function EditableCell({
  initialValue,
  label,
  current,
  handleClick,
  handleBlur,
  handleNext,
  Classes,
  editable = true,
  updateMyData,
}) {
  const classes = useStyles();
  const ref = useRef();
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.type !== "text") handleBlur();
    updateMyData(value);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  useEffect(() => {
    if (current === label) ref.current.focus();
    else ref.current.blur();
  }, [current]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      ref={ref}
      value={value}
      className={clsx(classes.inputFrame, { [Classes]: !!Classes })}
      onChange={onChange}
      onBlur={onBlur}
      onClick={handleClick}
      onKeyUp={onKeyUp}
      readOnly={!editable}
    />
  );
}
