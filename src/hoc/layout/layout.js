import React,{ useState } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/SideDrawer/Sidedrawer";
import { connect } from "react-redux";

const layout=(props)=>{

  const [showSideDrawer,setShowSideDrawer]=useState(false);


 const sideDrawerToggleHandler=()=>{
    setShowSideDrawer(!showSideDrawer)
       
   }
  const removeSideDrawerHandler=()=>{
    setShowSideDrawer(false);
}


        return(
            <Auxiliary>
                <Toolbar drawerToggle={sideDrawerToggleHandler}
                  isAuthenticated={props.isAuthenticated}
                />
                <Sidedrawer open={showSideDrawer}
                 closed={removeSideDrawerHandler} 
                 isAuthenticated={props.isAuthenticated}/>
                <main className={classes.content}>{props.children}</main>
            </Auxiliary>
        );
}
const mapStateToProps = state =>{
    return{
       
        isAuthenticated:state.authR.token !== null
    }
}
export default connect(mapStateToProps)(layout);