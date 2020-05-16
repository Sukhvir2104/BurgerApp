import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls=[
   {label: "Salad", type: "salad"},
   {label: "Bacon", type: "bacon"},
   {label: "Meat", type: "meat"},
   {label: "Cheese", type: "cheese"} 
]
const buildControls = (props)=> {
    return(
        <div className={classes.BuildControls}>
            <div><p>Total price : {props.burgerPrise}</p></div>
        {controls.map(ctrls =>{
            return <BuildControl 
            key={ctrls.label} 
            label={ctrls.label} 
            added={()=>props.ingredientsAdded(ctrls.type)}
            removed={ ()=> props.ingredientsRemoved(ctrls.type)}
        
            />
        })}
    </div>
    );
   
}
export default buildControls;