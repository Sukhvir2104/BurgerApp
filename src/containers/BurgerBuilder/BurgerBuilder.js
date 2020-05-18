import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICS={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrise: 4,
        purchasable: false,
        purchasing: false
    }
updatePurchaseState(ingredients){
     const sum = Object.keys(ingredients).map(igkey => {
       return ingredients[igkey]}).reduce((sum,el)=>{
            return sum+el
        },0);
        this.setState({purchasable: sum>0});
               
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
        alert("Continue to purcase");
    }
    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
             disabledInfo[key]=disabledInfo[key] <= 0
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClose={this.removePurchaseHandler}>
                  <OrderSummary ingredients={this.state.ingredients}
                  cancelPurchase={this.removePurchaseHandler}
                  continuePurchase={this.continuePurchaseHandler}
                  prise={this.state.totalPrise}
                  >
                  </OrderSummary>
                 </Modal>
                <Burger ingredients={this.state.ingredients} 
                />
                <BuildControls 
                   ingredientsAdded={this.addIngredientHandler}
                   ingredientsRemoved={this.removeIngredientHandler}
                   burgerPrise={this.state.totalPrise}
                   disabled={disabledInfo}
                   orderNow={this.state.purchasable}
                   ordered={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }

}
export default BurgerBuilder;
