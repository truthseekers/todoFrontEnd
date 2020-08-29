import React, { useState } from "react";

const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = (props) => {
  let userName;
  let loggedInStatus;
  let userId;
  if (props.userData) {
    userName = props.userData.me.name;
    userId = props.userData.me.id;
    loggedInStatus = true;
  }

  const [state, setState] = useState({
    userName: userName,
    isLoggedIn: loggedInStatus,
    userId: userId,
    // currentListId: "406",
  });

  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
