import { useState, useCallback } from "react";
import produce, { enableMapSet } from "immer";

enableMapSet();

export const useImmer = (initialValue) => {
  const [val, updateValue] = useState(initialValue);
  return [
    val,
    useCallback((updater) => {
      updateValue(produce(updater));
    }, []),
  ];
};
