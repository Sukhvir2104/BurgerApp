import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./layout.css";

const layout = ( props ) =>(
    <Auxiliary>
        <div>Toolbar,SideDrawer,Backdrop</div>
        <main className={classes.content}>{props.children}</main>
    </Auxiliary>
);
export default layout;