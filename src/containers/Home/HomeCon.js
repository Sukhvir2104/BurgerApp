import React from "react";
import Home from "../../components/Home/Home";
const homeCon = (props)=>{
    const orderMenuHandler =()=>{
        
        return  props.history.push("/burgermenu");

    }
    return (<Home menuHandler={orderMenuHandler} />);
}
export default homeCon;