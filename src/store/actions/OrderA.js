import * as actionTypes from "./actionTypes";
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
    
    return{
        type:actionTypes.PURCHASE_BURGER,
        orderData:orderData,
        token:token
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
    return {
        type:actionTypes.FETCH_ORDER,
        token:token,
        userId:userId
    }
}