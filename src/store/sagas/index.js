import {takeEvery,all,takeLatest} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {logoutSaga,checkAuthTimeOutSaga,authUserSaga,authCheckStateSaga} from "./authS";
import {initIngredientsSaga} from "./burgerBuilderS";
import {purchaseBurgerSaga,fetchOrderSaga,orderDeleteSaga} from "./OrderS";

export function* watchAuth(){
    yield all([
         takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
         takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeOutSaga),
         takeEvery(actionTypes.AUTH_USER,authUserSaga),
         takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga)
    ])
   
}
export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientsSaga);
}
export function* watchOrder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDER,fetchOrderSaga);
    yield takeEvery(actionTypes.ORDER_DELETE,orderDeleteSaga);
}
