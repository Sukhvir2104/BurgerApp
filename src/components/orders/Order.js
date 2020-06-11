import React from "react";
import classes from "./Order.css";
import DeleteIcon from '@material-ui/icons/Delete';
import DetailsIcon from '@material-ui/icons/Details';
const Order = (props)=>{
    const ingredients=[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map(ig=>{
    return <span key={ig.name} className={classes.ingredientBox}>{ig.name} {ig.amount}</span>
    })
        return (
            <div className={classes.Order} >
                <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        <button className={classes.detailButton} onClick={()=>props.orderDetailContinued(props.id)}>
             <DetailsIcon />
        </button>
        <button className={classes.deleteButton} onClick={()=>props.deleteItem(props.id)}>
             <DeleteIcon />
        </button>
       
            </div>
        );
}
export default Order;