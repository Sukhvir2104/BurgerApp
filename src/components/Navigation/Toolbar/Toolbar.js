import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import Navigation from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggler/DrawerToggle";

const toolbar = (props)=> {
 return(
     <header className={classes.Toolbar}>
         <DrawerToggle clicked={props.drawerToggle} />
         <div className={classes.Logo}>
            <Logo />
         </div>
         <nav className={classes.DesktopOnly}><Navigation /></nav>

     </header>
    
	);
}
export default toolbar;