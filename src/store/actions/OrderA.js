import * as actionTypes from "./actionTypes";
import axios from "../../axios"
//-----------------------------FOR POSTING DATA----------
export const purchaseBurgerSucess =(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseBurgerFail =(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart =(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START,
    }
}
export const purchaseInit =()=>{
    return{
        type:actionTypes.PURCHASE_INIT,
    }
}
export const purchaseBurger =(orderData)=>{
    
    return dispatch=>{
        dispatch(purchaseBurgerStart())
        axios.post("/order.json",orderData)
        .then(response=> {
            console.log(response.data)
            dispatch(purchaseBurgerSucess(response.data.name,orderData))
        }) 
        .catch(err=> dispatch(purchaseBurgerFail(err)));
    }
}
//---------------------FOR ORDER SUMMARY--------------------
export const fetchOrderSuccess =orders=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail =(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
export const fetchOrderStart =()=>{
    return{
        type:actionTypes.FETCH_ORDER_START,
    }
}
export const fetchOrder =()=>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        axios.get("/order.json")
        .then(res=> {
            const fetchedOrder=[];
            for(let key in res.data){
                fetchedOrder.push({...res.data[key],id:key})
            }
            dispatch(fetchOrderSuccess(fetchedOrder))
        })
        .catch(error=>dispatch(fetchOrderFail(error)));
    }
}