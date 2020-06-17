import React from "react";
import classes from "./copyRight.css";

const copyRight = (props)=> {
    const date = new Date().getFullYear();
 return(
     <footer className={classes.copyRight}>
         
            <p>Copyright &copy; {date} {props.companyName}</p>
     </footer>
    
	);
}
export default copyRight;