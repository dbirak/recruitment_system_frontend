"use client";

const ProtectRoute = (props) => {
  if (
    props.role === "company" &&
    localStorage.getItem("role") === "company" &&
    localStorage.getItem("token")
  )
    return props.children;
  else if (
    props.role === "user" &&
    localStorage.getItem("role") === "user" &&
    localStorage.getItem("token")
  )
    return props.children;
  else if (
    props.role === "null" &&
    !localStorage.getItem("role") &&
    !localStorage.getItem("token")
  )
    return props.children;
  else if (
    props.role === "user null" &&
    (localStorage.getItem("role") === "user" || !localStorage.getItem("role"))
  )
    return props.children;
  else if (props.role !== localStorage.getItem("role"));
  {
    //localStorage.clear();
    if (localStorage.getItem("role") === "company") {
      window.location.href = "/company/dashboard";
    } else {
      window.location.href = "/";
    }
  }

  return null;
};

export default ProtectRoute;
