import React from "react";
import classes from "./OrderDetail.css"
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import DeleteIcon from '@material-ui/icons/Delete';


const orderDetail =(props)=>{


    const ingredients=[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map(ig=>{
    return <span key={ig.name} className={classes.ingredientBox}>{ig.name}  : {ig.amount} <br></br></span>
    })

return(<div className={classes.Order}>
    <p>Ingredients</p>
    <p>{ingredientOutput}</p>
    <p>USD : {props.price}</p>
    <p>Name: {props.name}</p>
    <p>Email: {props.email}</p>
    <p>Delivery Methode: {props.deliveryMethod}</p>
    <p>Date: {props.Date}</p>
    <button className={classes.flipBackButton} onClick={()=>props.flipBackContinued()}>
             <FlipToBackIcon style={{ fontSize: 40}}/>
        </button>
        <button className={classes.deleteButton} onClick={()=>props.deleteItem()}>
             <DeleteIcon style={{ fontSize: 40}} />
        </button>

</div>);
}
export default orderDetail;