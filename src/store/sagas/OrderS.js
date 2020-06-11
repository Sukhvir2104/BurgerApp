import {put} from "redux-saga/effects";
import * as actions from "../actions/index";
//import {delay} from "redux-saga/effects";
import axios from "../../axios";

export function* purchaseBurgerSaga(action){
    yield put(actions.purchaseBurgerStart())
    try{
        const response =yield axios.post("/order.json?auth="+action.token,action.orderData)
        yield put(actions.purchaseBurgerSucess(response.data.name,action.orderData))
    }catch(err){
            yield put(actions.purchaseBurgerFail(err));
        } 
}
export function* fetchOrderSaga(action){
    yield put(actions.fetchOrderStart())
        const querryParams = '?auth='+ action.token +'&orderBy="userId"&equalTo="'+ action.userId +'"' ;

     try{
        const response= yield axios.get('/order.json'+querryParams)
        const fetchedOrder=[];
            for(let key in response.data){
                fetchedOrder.push({...response.data[key],id:key})
            }
            yield put(actions.fetchOrderSuccess(fetchedOrder))
     }  catch(error){yield put(actions.fetchOrderFail(error))}; 
      
       

}

export function* orderDeleteSaga(action){
    let fetchedOrder=[];
    yield put(actions.orderDeleteStart())  
     try{
        const response= yield axios.delete(`/order/${action.orderId}.json?auth=`+action.token)
            fetchedOrder = yield action.orderId;
            yield put(actions.orderDeleteSuccess(fetchedOrder))
     }  catch(error){yield put(actions.orderDeleteFail(error))}; 
}