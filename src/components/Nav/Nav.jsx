import React from "react";
import "./Nav.css";
import { useSelector } from "react-redux";
import LoggedInNav from "../LoggedInNav/LoggedInNav";
import LoggedOutNav from "../LoggedOutNav/LoggedOutNav";

function Nav() {

  const user = useSelector((store) => store.user);

  console.log(user.id)
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
