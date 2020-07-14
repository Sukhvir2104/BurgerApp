import * as actionTypes from "./actionTypes";
//---------------------FOR ORDER SUMMARY--------------------
export const fetchBurgerMenuSuccess =BurgerMenu=>{
    return{
        type:actionTypes.FETCH_BURGER_MENU_SUCCESS,
        BurgerMenu:BurgerMenu
    }
}
export const fetchBurgerMenuFail =(error)=>{
    return{
        type:actionTypes.FETCH_BURGER_MENU_FAIL,
        error:error
    }
}
export const fetchBurgerMenuStart =()=>{
    return{
        type:actionTypes.FETCH_BURGER_MENU_START
    }
}
export const fetchBurgerMenu =()=>{
    return {
        type:actionTypes.FETCH_BURGER_MENU,
    }
}
export const toggleSelect = id => {
    return { type: actionTypes.TOGGLE_SELECT, productId: id };
};
export const quantitySelectAdd = (id) => {
    return { type: actionTypes.QUANTITY_SELECT_ADD, productId: id };
};
export const quantitySelectSub = (id) => {
    return { type: actionTypes.QUANTITY_SELECT_SUB, productId: id };
};