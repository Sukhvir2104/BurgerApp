import React,{Component} from "react";
import Order from "../../components/orders/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner"
class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrder(this.props.token,this.props.userId);
    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders=this.props.orders.map(order=>{
                return <Order key={order.id} price={order.price} ingredients={order.ingredients} />
         })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
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
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));