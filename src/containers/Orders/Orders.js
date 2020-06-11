import React,{useEffect} from "react";
import Order from "../../components/orders/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Route,Redirect} from "react-router-dom";
const orders =(props)=>{
     const {onFetchOrder}=props;
    useEffect(()=>{
        onFetchOrder(props.token,props.userId);
    
    },[onFetchOrder]);
 
    const orderDetailContinued=(id)=>{
        return props.history.replace("/orders/"+id);
    }
  
    const deleteOrderHandler=(id)=>{
      let orderId = [];
        orderId = props.orderId.find(ig=>ig===id);
        props.onOrderDelete(props.token,orderId);
  }
        let orders = <Spinner />
        if(!props.loading){
            orders=props.orders.map(order=>{
                return <Order  key={order.id} id={order.id} price={order.price} ingredients={order.ingredients} 
                deleteItem={deleteOrderHandler}  orderDetailContinued={orderDetailContinued}
                />
                
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
        userId:state.authR.userId,
        orderId:state.orderR.orderId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder:(token,userId)=>dispatch(actions.fetchOrder(token,userId)),
        onOrderDelete:(token,orderId)=>dispatch(actions.orderDelete(token,orderId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orders,axios));