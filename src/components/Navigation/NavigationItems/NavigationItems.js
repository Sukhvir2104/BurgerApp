import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props)=> {
 return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Home</NavigationItem>
        <NavigationItem link="/burgerBuilder" exact >Burger Builder</NavigationItem>
        <NavigationItem link="/Cart" exact >Cart</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {!props.isAuth 
         ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
          : <NavigationItem link="/logout" >Logout</NavigationItem>
        }
        
        
    </ul>
	);
}
export default NavigationItems;