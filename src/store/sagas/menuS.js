import {put} from "redux-saga/effects";
import * as actions from "../actions/index";
//import {delay} from "redux-saga/effects";
import axios from "../../axios";


export function* fetchBurgerMenuSaga(){
    yield put(actions.fetchBurgerMenuStart())

     try{
        const response= yield axios.get('/Menu/BurgerMenu.json')
        const fetchedOrder=[];
        for(let key in response.data){
            fetchedOrder.push({...response.data[key],id:key})
        }
           // console.log(fetchedOrder)
            yield put(actions.fetchBurgerMenuSuccess(fetchedOrder))
     }  catch(error){yield put(actions.fetchBurgerMenuFail(error))}; 
      
       

}

