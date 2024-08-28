import React from 'react';
import "../Style/frontpage.css";
import logo from "../img/logo1.png";


 function Logo ({icon}) {
    return (
        <div className = "ifdb-logo"><img src={logo} alt ="ifdb-logo"/></div>
  );
}
export default Logo; 
