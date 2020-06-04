import React, { useEffect} from "react";
import {connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import {Redirect} from "react-router-dom";
const logout=(props)=>{
    const {onLogout}=props;
    useEffect(()=>{
        onLogout()
    },[onLogout])


        return <Redirect to="/" />

}
const mapDispatchToProps = dispatch =>{
    return{
        onLogout:()=>dispatch(actions.authLogOut())
    }
}
export default connect(null,mapDispatchToProps)(logout);