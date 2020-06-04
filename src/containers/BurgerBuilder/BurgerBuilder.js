import React, { useEffect,useState, useCallback } from "react";
import {useDispatch, useSelector} from "react-redux";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as  actions from "../../store/actions/index";
// const INGREDIENT_PRICS={
//     salad:0.5,
//     cheese:0.4,
//     meat:1.3,
//     bacon:0.7
// }

const burgerBuilder=(props)=>{
    const [purchasing,setPurchasing]=useState(false);
    const dispatch = useDispatch();

   //----------------------use od use Selector instead od mapStateToProps or connect-----
     const ings = useSelector(state=>state.burgerBuilerR.ingredients);
     const price= useSelector(state=>state.burgerBuilerR.totalPrice)
     const error=useSelector(state=>state.burgerBuilerR.error);
     const isAuthenticated= useSelector(state=>state.authR.token !== null);

 //----------------------use od use Selector instead od mapDispatchToProps or connect-----
   

     const onIngredientsAdded = (ingName) => dispatch (actions.addIngredient(ingName) );
     const onIngredientsRemoved =(ingName) => dispatch (actions.removeIngredient(ingName) );
     const onInitIngredients = useCallback(() => dispatch (actions.initIngredients() ),[dispatch]);
     const onPurchaseInit=()=> dispatch(actions.purchaseInit());
     const onSetAuthRedirectPath=(path)=>dispatch(actions.setAuthRedirectPath(path));






useEffect(()=>{
    onInitIngredients();
},[onInitIngredients]);
       

const updatePurchaseState=(ingredients)=>{
     const sum = Object.keys(ingredients).map(igkey => {
       return ingredients[igkey]}).reduce((sum,el)=>{
            return sum+el
        },0);
        return sum>0 ;
               
}
//  const addIngredientHandler = (type)=>{
//         const oldCount = state.ingredients[type];
//         const newCount = oldCount+1;
//         const updatedIngredients={
//             ...state.ingredients
//         } 
//         updatedIngredients[type]=newCount;
//         const additionPrise=INGREDIENT_PRICS[type];
//         const oldPrise = state.totalPrise;
//         const newPrise = oldPrise+additionPrise;
//    //     setState({totalPrise:newPrise,ingredients:updatedIngredients});
//         updatePurchaseState(updatedIngredients);
//     }

//    const removeIngredientHandler = (type)=>{
//         const oldCount = state.ingredients[type];
//         if (oldCount<=0){
//             return;
//         }
//         const newCount = oldCount-1;
//         const updatedIngredients={
//             ...state.ingredients
//         } 
//         updatedIngredients[type]=newCount;
//         const deductionPrise=INGREDIENT_PRICS[type];
//         const oldPrise = state.totalPrise;
//         const newPrise = oldPrise-deductionPrise;
//      //   setState({totalPrise:newPrise,ingredients:updatedIngredients});
//         updatePurchaseState(updatedIngredients);

//     }
    const purchaseHandler = ()=>{
        if(isAuthenticated){
            setPurchasing(true);
        }else{
            onSetAuthRedirectPath("/checkout")
            props.history.push("/auth")
        }
        
    }
   const removePurchaseHandler = ()=>{
        setPurchasing(false);
    }
   const continuePurchaseHandler=()=>{
        onPurchaseInit()
          props.history.push("/checkout");
    }


        const disabledInfo ={
            ...ings
        }
        for(let key in disabledInfo){
             disabledInfo[key]=disabledInfo[key] <= 0
        }
// --------------------------------------------setting spinner---------------------
        let orderSummary=null;
       let burger= error ? <p>ingredient can't be loaded</p> : <Spinner />
       if(ings){
            burger=(<Auxiliary>
                <Burger ingredients={ings} 
                />
                <BuildControls 
                ingredientsAdded={onIngredientsAdded}
                ingredientsRemoved={onIngredientsRemoved}
                burgerPrise={price}
                disabled={disabledInfo}
                orderNow={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                isAuthenticated={isAuthenticated}
                />
                </Auxiliary>);
            orderSummary=<OrderSummary ingredients={ings}
            cancelPurchase={removePurchaseHandler}
            continuePurchase={continuePurchaseHandler}
            prise={price}
           />
        }
         
        return(
            <Auxiliary>
                <Modal show={purchasing} modalClose={removePurchaseHandler}>
                  {orderSummary}
                 </Modal>
                  {burger}
            </Auxiliary>
        );

}
// const mapStateToProps = state => {
//     return {
//         ings:state.burgerBuilerR.ingredients,
//         price:state.burgerBuilerR.totalPrice,
//         error:state.burgerBuilerR.error,
//         isAuthenticated:state.authR.token !== null
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientsAdded : (ingName) => dispatch (actions.addIngredient(ingName) ),
//         onIngredientsRemoved :(ingName) => dispatch (actions.removeIngredient(ingName) ),
//         onInitIngredients :() => dispatch (actions.initIngredients() ),
//         onPurchaseInit:()=> dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
//     }
// };
export default (withErrorHandler( burgerBuilder, axios ));
