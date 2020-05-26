import React, { Component } from "react";
import {connect} from "react-redux";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as  actionTypes from "../../store/action";
const INGREDIENT_PRICS={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    state={
       // ingredients:null,
       // totalPrise: 4,
        purchasable: false,
        purchasing: false,
        loading:false,
        error:false
    }
    componentDidMount(){
        // axios.get("https://burgerapp-c6517.firebaseio.com/ingredients.json")
        // .then(response=> this.setState({ingredients:response.data}))
        // .catch(error=> this.setState({error:true}))
    }
updatePurchaseState(ingredients){
     const sum = Object.keys(ingredients).map(igkey => {
       return ingredients[igkey]}).reduce((sum,el)=>{
            return sum+el
        },0);
        return sum>0 ;
               
}
 addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        } 
        updatedIngredients[type]=newCount;
        const additionPrise=INGREDIENT_PRICS[type];
        const oldPrise = this.state.totalPrise;
        const newPrise = oldPrise+additionPrise;
        this.setState({totalPrise:newPrise,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if (oldCount<=0){
            return;
        }
        const newCount = oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        } 
        updatedIngredients[type]=newCount;
        const deductionPrise=INGREDIENT_PRICS[type];
        const oldPrise = this.state.totalPrise;
        const newPrise = oldPrise-deductionPrise;
        this.setState({totalPrise:newPrise,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }
    purchaseHandler = ()=>{
        this.setState({purchasing:true});
    }
    removePurchaseHandler = ()=>{
        this.setState({purchasing:false});
    }
    continuePurchaseHandler=()=>{
          this.props.history.push("/checkout");
    }
    render(){

        const disabledInfo ={
            ...this.props.ings
        }
        for(let key in disabledInfo){
             disabledInfo[key]=disabledInfo[key] <= 0
        }
// --------------------------------------------setting spinner---------------------
        let orderSummary=null;
       if(this.state.loading){
           orderSummary=<Spinner />
       }
       let burger= this.state.error ? <p>ingredient can't be loaded</p> : <Spinner />
       if(this.props.ings){
            burger=(<Auxiliary>
                <Burger ingredients={this.props.ings} 
                />
                <BuildControls 
                ingredientsAdded={this.props.onIngredientsAdded}
                ingredientsRemoved={this.props.onIngredientsRemoved}
                burgerPrise={this.props.price}
                disabled={disabledInfo}
                orderNow={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                />
                </Auxiliary>);
            orderSummary=<OrderSummary ingredients={this.props.ings}
            cancelPurchase={this.removePurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
            prise={this.props.price}
           />
        }
         
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClose={this.removePurchaseHandler}>
                  {orderSummary}
                 </Modal>
                  {burger}
            </Auxiliary>
        );
    }

}
const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded : (ingName) => dispatch ({type:actionTypes.ADD_INGREDIENTS, ingredientName:ingName} ),
        onIngredientsRemoved :(ingName) => dispatch ({type:actionTypes.REMOVE_INGREDIENTS, ingredientName:ingName} )
       // onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( BurgerBuilder, axios ));
