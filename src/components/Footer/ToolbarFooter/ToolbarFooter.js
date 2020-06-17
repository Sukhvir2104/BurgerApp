import React from "react";
import classes from "./ToolbarFooter.css";
import CopyRight from "../copyRigh/copyRight";

const toolbarFooter = (props)=> {
 return(
     <footer className={classes.ToolbarFooter}>
         <CopyRight companyName="Demo Shop"/>
     </footer>
    
	);
}
export default toolbarFooter;