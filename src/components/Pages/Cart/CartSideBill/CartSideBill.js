import React from "react";
import classes from "./CartSideBill.css"
const cartSideBill = (props) =>{
   return(
       <div className={classes.sidebill_wrapper}>
           <div className={classes.sidebill_container}>
                <p style={{fontWeight:"bold"}}>{props.Name}</p><br />
                <p>Price: ${props.price}</p>
                <p>Quantity: {props.quantity}</p>
           </div>

       </div>
   );
}
export default cartSideBill;