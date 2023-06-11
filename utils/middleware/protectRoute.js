import { useContext } from "react";
import { AuthContext } from "../context/AuthStore";
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = (props) => {
  const Auth = useContext(AuthContext);

  if (
    props.role === "company" &&
    localStorage.getItem("role") === "company" &&
    localStorage.getItem("token")
  )
    return <Outlet />;
  else if (
    props.role === "user" &&
    localStorage.getItem("role") === "user" &&
    localStorage.getItem("token")
  )
    return <Outlet />;
  else if (
    props.role === "null" &&
    !localStorage.getItem("role") &&
    !localStorage.getItem("token")
  )
    return <Outlet />;
  else if (props.role !== localStorage.getItem("role"));
  {
    //localStorage.clear();
    return <Navigate to="/" />;
  }
};

export default ProtectRoute;
