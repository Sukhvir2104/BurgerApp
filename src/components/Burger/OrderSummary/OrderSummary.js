import React,{Component} from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component{
    //this will be functiom, no nedd to be class component
      componentWillUpdate(){
          console.log("[ordersummery.js] update");
          
      }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey=>{
        return <li key={igkey}><span style={{textTransform:"capitalize"}}>{igkey}</span> : {this.props.ingredients[igkey]}</li>
        })
        return(
            <Auxiliary>
                <h3>Your Order</h3>
                <p>Your delicious burger with the following ingrendients :</p>
                <ul>
                   {ingredientSummary}
                </ul>
                <p><strong>Total Prise: {this.props.prise.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
                
            </Auxiliary>
            );
    }
} 
export default OrderSummary;