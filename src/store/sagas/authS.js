import {put,call} from "redux-saga/effects";
import * as actions from "../actions/index";
import {delay} from "redux-saga/effects";
import axios from "axios";

export function* logoutSaga(action){
    yield call([localStorage,'removeItem'],"token");
    yield call([localStorage,'removeItem'],"expirationDate");
    yield call([localStorage,'removeItem'],"userId");
//    yield localStorage.removeItem("token");
//    yield localStorage.removeItem("expirationDate");
//    yield localStorage.removeItem("userId");
    yield put(actions.logoutSucceed());
}
export function* checkAuthTimeOutSaga(action){
    yield delay(action.expirationTime);
    yield put(actions.authLogOut());
}
export function* authUserSaga(action){
    yield put(actions.authStart())
    const authData={
        email:action.email,
        password:action.password,
        returnSecureToken:true
    }
    let url =process.env.REACT_APP_FIERBASE_USER_API;
    if(!action.isSignup){
        url=process.env.REACT_APP_FIERBASE_USER_SIGNIN_API
    }
    try{
        const response=yield axios.post(url,authData)
        //console.log(response.data.localId);
        const expirationDate = yield new Date(new Date().getTime()+response.data.expiresIn * 1000);
        yield localStorage.setItem("token",response.data.idToken);                localStorage.setItem("expirationDate",expirationDate);
        yield localStorage.setItem("userId",response.data.localId);
        yield put(actions.authSuccess(response.data.idToken,response.data.localId));
        yield put(actions.checkAuthTimeOut(response.data.expiresIn));
    }catch(error){
        yield put(actions.authFail(error.response.data.error))
             }
}
export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem("token");
    if(!token){
        yield put(actions.authLogOut());
    }else{
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if(expirationDate<=new Date()){
            yield put(actions.authLogOut());
        }else{
            const userId =yield localStorage.getItem("userId");
            yield put(actions.authSuccess(token,userId));
            yield put(actions.checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
        }
    }
}