import React from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token:
      localStorage.getItem("token") !== "" ? localStorage.getItem("token") : "",
    role:
      localStorage.getItem("role") !== "" ? localStorage.getItem("role") : "",
  });

  const setUserAuthInfo = ({ data }) => {
    const token = localStorage.setItem("token", data.token);
    const role = localStorage.setItem("token", data.role);

    setAuthState({
      token: token,
      role: role,
    });
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
