import React,{ Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/SideDrawer/Sidedrawer";

class Layout extends Component{
   state={
       showSideDrawer:false
   }

  sideDrawerToggleHandler=()=>{
       this.setState((prevState)=>{
        return {showSideDrawer:!prevState.Sidedrawer}
       })
       
   }
   removeSideDrawerHandler=()=>{
    this.setState({showSideDrawer:false});
}

    render(){
        return(
            <Auxiliary>
                <Toolbar drawerToggle={this.sideDrawerToggleHandler} />
                <Sidedrawer open={this.state.showSideDrawer}
                 closed={this.removeSideDrawerHandler} />
                <main className={classes.content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}
export default Layout;