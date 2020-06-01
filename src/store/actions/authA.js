import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart =()=>{
    return{
        type:actionTypes.AUTH_START
    };
}
export const authSuccess =(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
};
export const authFail =(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
};
export const authLogOut=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return{
        type:actionTypes.AUTH_LOGOUT, 
    }
};
export const checkAuthTimeOut=(expirationTime)=>{
        return dispatch =>{
             setTimeout(()=>{
                dispatch(authLogOut())
             },expirationTime * 1000)
        }
};
export const auth =(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url =process.env.REACT_APP_FIERBASE_USER_API;
        if(!isSignup){
            url=process.env.REACT_APP_FIERBASE_USER_SIGNIN_API
        }
        axios.post(url,authData)
        .then(response=>{
                
                    //console.log(response.data.localId);
                    const expirationDate = new Date(new Date().getTime()+response.data.expiresIn * 1000);
                    localStorage.setItem("token",response.data.idToken);
                    localStorage.setItem("expirationDate",expirationDate);
                    localStorage.setItem("userId",response.data.localId);
                    dispatch(authSuccess(response.data.idToken,response.data.localId));
                    dispatch(checkAuthTimeOut(response.data.expiresIn));
                
            }
        )
        .catch(error=>{
            
                console.log(error);
                dispatch(authFail(error.response.data.error))
                 
        }
    )
        
    }
};
export const setAuthRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUT_REDIRECT_PATH,
        path:path
    }
}
//--------------------------------this function is to keep the user authenicate unitl tile is not expired even after refreshing the page
export const authCheckState=()=>{
    return dispatch=>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(authLogOut());
        }else{
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate<=new Date()){
                dispatch(authLogOut());
            }else{
                const userId =localStorage.getItem("userId");
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
        
    }
}


