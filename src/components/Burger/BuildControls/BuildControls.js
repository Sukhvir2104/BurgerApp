import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls=[
   {label: "Salad", type: "salad"},
   {label: "Bacon", type: "bacon"},
   {label: "Cheese", type: "cheese"},
   {label: "Meat", type: "meat"} 
]
const buildControls = (props)=> {
    return(
        <div className={classes.BuildControls}>
            <p>Total price : <strong>{props.burgerPrise.toFixed(2)}</strong></p>
        {controls.map(ctrls =>{
            return <BuildControl 
            key={ctrls.label} 
            label={ctrls.label} 
            added={()=>props.ingredientsAdded(ctrls.type)}
            removed={ ()=> props.ingredientsRemoved(ctrls.type)}
            disabled={props.disabled[ctrls.type]}
            
            />
        })}
        <button className={classes.OrderButton}
            disabled={!props.orderNow}
            onClick={props.ordered}
            >{props.isAuthenticated ? "Order Now" : "Sign Up To Order"}</button>
    </div>
    );
   
}
export default buildControls;