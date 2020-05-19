
import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
const INGREDIENT_PRICS={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrise: 4,
        purchasable: false,
        purchasing: false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get("https://burgerapp-c6517.firebaseio.com/ingredients.json")
        .then(response=> this.setState({ingredients:response.data}))
        .catch(error=> this.setState({error:true}))
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
       // alert("Continue to purcase");
       this.setState({loading:true})
       const order={
           ingredients:this.state.ingredients,
           price:this.state.totalPrise,
           customer:{
               name:"sukh",
               address:{
                   street:"testStreet1",
                   zipCode:"521115",
                   country:"canada"
                 },
                 email:"test@test.com",
                 deliveryMethod:"fastest"
           }
       }
       axios.post("/order.json",order)
       .then(response=> this.setState({loading:false,purchasing:false})) 
       .catch(err=> this.setState({loading:false,purchasing:false}));
    }
    render(){

        const disabledInfo ={
            ...this.state.ingredients
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
       if(this.state.ingredients){
            burger=(<Auxiliary>
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
                </Auxiliary>);
            orderSummary=<OrderSummary ingredients={this.state.ingredients}
            cancelPurchase={this.removePurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
            prise={this.state.totalPrise}
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
export default withErrorHandler( BurgerBuilder, axios );
