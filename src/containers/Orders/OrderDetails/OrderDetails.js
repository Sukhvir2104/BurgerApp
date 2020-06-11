import React,{useEffect} from "react";
import OrderDetail from "../../../components/orders/OrderDetail/OrderDetail";
import axios from "../../../axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import {connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";

const orderDetails =(props)=>{
    let orderDetail= props.orders.find(ig=>ig.id===props.match.params.id);
    const {onFetchOrder}=props;
    useEffect(()=>{
        onFetchOrder(props.token,props.userId);
    
    },[onFetchOrder]);

const flipBackContinued =()=>{
    return props.history.replace("/orders");
}
const deleteOrderHandler=(id)=>{
    props.onOrderDelete(props.token,orderDetail.id);
        props.history.replace("/orders");
}

  
 // console.log(orderDetail);
  
    return(<OrderDetail  ingredients={orderDetail.ingredients} price={orderDetail.price}
         deliveryMethod={orderDetail.orderData.deliveryMethod} name={orderDetail.orderData.name} 
         email={orderDetail.orderData.email} flipBackContinued={flipBackContinued}
         deleteItem={deleteOrderHandler}
    />);
}
const mapStateToProps = state =>{
    return{
        orders:state.orderR.orders,
        loading:state.orderR.loading,
        token:state.authR.token,
        userId:state.authR.userId,
        orderId:state.orderR.orderId,
        orderRed:state.orderR.orderRed
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder:(token,userId)=>dispatch(actions.fetchOrder(token,userId)),
        onOrderDelete:(token,orderId)=>dispatch(actions.orderDelete(token,orderId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orderDetails,axios));