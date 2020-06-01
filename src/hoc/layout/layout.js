import React,{ Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/SideDrawer/Sidedrawer";
import { connect } from "react-redux";

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
                <Toolbar drawerToggle={this.sideDrawerToggleHandler}
                  isAuthenticated={this.props.isAuthenticated}
                />
                <Sidedrawer open={this.state.showSideDrawer}
                 closed={this.removeSideDrawerHandler} 
                 isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}
const mapStateToProps = state =>{
    return{
       
        isAuthenticated:state.authR.token !== null
    }
}
export default connect(mapStateToProps)(Layout);