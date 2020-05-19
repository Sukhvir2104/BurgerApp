import React from "react";
import classes from "./Logo.css";
import burgerLogo from "../../Assets/images/burger-logo.png";
const logo = (props)=> {
 return(
    <div className={classes.Logo}>
        <img src={burgerLogo}
        alt="sukh"
       />
    </div>
	);
}
export default logo;