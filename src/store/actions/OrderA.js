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
export const purchaseBurger =(orderData,token)=>{
    
    return dispatch=>{
        dispatch(purchaseBurgerStart())

        axios.post("/order.json?auth="+token,orderData)
        .then(response=> {
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
        type:actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrder =(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const querryParams = '?auth='+ token +'&orderBy="userId"&equalTo="'+ userId +'"' ;
        axios.get('/order.json'+querryParams)
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