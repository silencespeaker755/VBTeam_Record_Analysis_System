import React, { createContext, useContext, useState } from "react";

const DateInfoContext = createContext({
  dateInfo: {},
  changeDate: () => {},
});

const DateInfoProvider = (props) => {
  const [dateInfo, setDateInfo] = useState({ current: null });

  const changeDate = (current = "") => {
    setDateInfo({ current });
  };

  return (
    <DateInfoContext.Provider value={{ dateInfo, changeDate }} {...props} />
  );
};

function useDateInfo() {
  return useContext(DateInfoContext);
}

export { DateInfoProvider, useDateInfo };
