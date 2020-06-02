import {put} from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios";

export function*  initIngredientsSaga(action){
   try{
  const response= yield axios.get(process.env.REACT_APP_GET_INGREDIENTS)
    yield put(actions.setIngredients(response.data))
   }catch(error){ yield put(actions.fetchIngredientsFailed())}

}