import React, { createContext, useContext, useState } from "react";

const UserInfoContext = createContext({
  userInfo: {},
  changeUser: () => {},
});

const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    isAdmin: false,
    auth: false,
  });

  const changeUser = (id, isAdmin = false, auth = false) => {
    setUserInfo({ id, isAdmin });
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, changeUser }} {...props} />
  );
};

function useUserInfo() {
  return useContext(UserInfoContext);
}

export { UserInfoProvider, useUserInfo };
