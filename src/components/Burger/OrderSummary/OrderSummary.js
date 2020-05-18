import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
const orderSummary = (props)=> {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey=>{
    return <li key={igkey}><span style={{textTransform:"capitalize"}}>{igkey}</span> : {props.ingredients[igkey]}</li>
    })
 return(
    <Auxiliary>
        <h3>Your Order</h3>
        <p>Your delicious burger with the following ingrendients :</p>
        <ul>
           {ingredientSummary}
        </ul>
        <p><strong>Total Prise: {props.prise.toFixed(2)}</strong></p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
        
    </Auxiliary>
	);
}
export default orderSummary;