import React from "react";
import classes from "./Cart.css";
import burgerImage from "../../../Assets/images/chickenBurger.jpg";
const cart = (props)=>{

    const cartContentWrapper =["row",classes.cartContentWrapper];
    const cartImgwrapper=["col-lg-3","col-md-4","col-sm-5",classes.cartImgwrapper];
    const cartBurgerNameC=["col-lg-3","col-md-4","col-sm-5",classes.cartContent];
    const cartPriceC =["col-lg-3","col-md-4","col-sm-5",classes.cartPriceC];
    const cartQuantityC =["col-lg-3","col-md-4","col-sm-5",classes.cartQuantityC];

    return(<div className={cartContentWrapper.join(" ")}>
                <div className={cartImgwrapper.join(" ")}>
                    <img src={props.imageSrc} alt="Trulli" className={classes.menuImg}/>
                </div>
                <div className={cartBurgerNameC.join(" ")}>
                    <p className={classes.name}>{props.Name}</p>
                </div>
                
                <div className={cartQuantityC.join(" ")}>
                    <p className={classes.quantity}>Quantitly : {props.quantity}</p>
                </div>
                <div className={cartPriceC.join(" ")}> 
                    <p className={classes.price}>Price : ${props.price.toFixed(2)}</p>
                </div> 
    </div>
       
    );
}
export default cart;