import React from "react";
import "./Nav.css";
import { useSelector } from "react-redux";
import LoggedInNav from "./LoggedInNav/LoggedInNav";
import LoggedOutNav from "./LoggedOutNav/LoggedOutNav";

//Navigation bar conditionally rendered based on if user is logged in or not
function Nav() {

  const user = useSelector((store) => store.user);

  return (
    <>
    {(() => {
      if (user.id) {
        return (
          <LoggedInNav />
        )
        
      }
      else if (user.id === undefined) {
        return (
          <LoggedOutNav />
        )
        
      }
    })()} 
    </> 
  );
}

export default Nav;
