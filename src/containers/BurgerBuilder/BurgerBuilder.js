import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
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
        totalPrise: 4
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
        this.setState({totalPrise:newPrise,ingredients:updatedIngredients})

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
        this.setState({totalPrise:newPrise,ingredients:updatedIngredients})

    }
    render(){
        return(
            
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} 
                />
                <BuildControls 
                   ingredientsAdded={this.addIngredientHandler}
                   ingredientsRemoved={this.removeIngredientHandler}
                   burgerPrise={this.state.totalPrise}
                />
            </Auxiliary>
        );
    }

}
export default BurgerBuilder;
