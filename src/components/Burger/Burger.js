import React from "react";
import classes from "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) =>{
    let transferedIngredient=Object.keys(props.ingredients).map(igkey=>{
        return ([...Array(props.ingredients[igkey])].map((_,i)=>{
            {
                return <BurgerIngredient  key={igkey+i} type={igkey} />
            }
        } ))
    }).reduce((arr,el)=>{ return arr.concat(el)},[]);
   // console.log(transferedIngredient)
    if(transferedIngredient.length===0){
        transferedIngredient=<p>Please Start adding Ingredients</p>
    }
  // console.log([...Array(props.ingredients["bacon"])] ) 
    return(
        <div className={classes.Burger}>
              <BurgerIngredient type="bread-top" />
               {transferedIngredient}
              <BurgerIngredient type="bread-bottom" />

        </div>
      
    );

}
export default burger;