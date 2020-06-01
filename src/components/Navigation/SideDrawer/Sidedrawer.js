import React from "react";
import classes from "./Sidedrawer.css";
import  Navigation from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
const sideDrawer = (props)=> {
let attachedClasses =[classes.Sidedrawer,classes.Close];
if(props.open){
    attachedClasses =[classes.Sidedrawer,classes.Open]
}


 return(
        <Auxiliary>  
            <div className={classes.DesktopOnly}>
                  <Backdrop show={props.open} clicked={props.closed} />
            </div> 
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <div className={classes.Logo}>
                <Logo />
                    </div>
                <nav>
                    <Navigation isAuth={props.isAuthenticated} />
                </nav>
            </div>
        </Auxiliary>

	);
}
export default sideDrawer;