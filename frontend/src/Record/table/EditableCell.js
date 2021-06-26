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
  handleDoubleClick = () => {},
  handleBlur = () => {},
  handleNext,
  Classes,
  last = false,
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
    if (!e.relatedTarget) handleBlur();
    updateMyData(value);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      handleNext();
      if (last) ref.current.blur();
    }
  };

  useEffect(() => {
    if (current === label) ref.current.focus();
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
      onDoubleClick={handleDoubleClick}
      onKeyUp={onKeyUp}
      readOnly={!editable}
    />
  );
}
