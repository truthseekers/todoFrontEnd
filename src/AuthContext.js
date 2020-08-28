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
    test: "foo",
    testUser: "",
    userName: userName,
    isLoggedIn: loggedInStatus,
    userId: userId,
    currentListId: "404",
  });

  //console.log("state obj in authcontext: ");
  //console.log(state);
  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
