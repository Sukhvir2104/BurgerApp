import React,{useEffect} from "react";
import Order from "../../components/orders/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner"
const orders =(props)=>{
     const {onFetchOrder}=props;
    useEffect(()=>{
        onFetchOrder(props.token,props.userId);
    },[onFetchOrder]);
       
    

        let orders = <Spinner />
        if(!props.loading){
            orders=props.orders.map(order=>{
                return <Order key={order.id} price={order.price} ingredients={order.ingredients} />
         })
        }
        return (
            <div>
                {orders}
            </div>
        );

}
const mapStateToProps = state =>{
    return{
        orders:state.orderR.orders,
        loading:state.orderR.loading,
        token:state.authR.token,
        userId:state.authR.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder:(token,userId)=>dispatch(actions.fetchOrder(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orders,axios));