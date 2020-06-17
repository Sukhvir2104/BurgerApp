import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
    BurgerMenu: [],
    loading: false,
    MenuId:[],
};

const fetchBurgerMenuStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchBurgerMenuSuccess = ( state, action ) => {
    
    return updateObject( state, {
        BurgerMenu:action.BurgerMenu,
        loading: false,
        MenuId:action.BurgerMenu.map(ig=>ig.id)

    } );
};

const fetchBurgerMenuFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const productReducer = (state, action) => {
        const prodIndex = state.BurgerMenu.findIndex(
          p => p.id === action.productId
        );
        const newFavStatus = !state.BurgerMenu[prodIndex].IsSelect;
        const updatedProducts = [...state.BurgerMenu];
        updatedProducts[prodIndex] = {
          ...state.BurgerMenu[prodIndex],
          IsSelect: newFavStatus
        };
        return {
          ...state,
          BurgerMenu: updatedProducts
        };
  };




const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_BURGER_MENU_START: return fetchBurgerMenuStart( state, action );
        case actionTypes.FETCH_BURGER_MENU_SUCCESS: return fetchBurgerMenuSuccess( state, action );
        case actionTypes.FETCH_BURGER_MENU_FAIL: return fetchBurgerMenuFail( state, action );
        case actionTypes.TOGGLE_SELECT: return productReducer( state, action );
        default: return state;
    }
};

export default reducer;