import React from "react";
import classes from "./Home.css";
import BurgerMenuImg from "../../Assets/images/burderMenu.png";
import SalaMenuImg from "../../Assets/images/saladMenu.png";
import TrioMenuImg from "../../Assets/images/SnacksMenu.jpg";
import SnackMenuImg from "../../Assets/images/trioMenu.jpg";
import Button from "../UI/Button/Button";
const home = (props)=>{
    let menuContainer =["row",classes.menu_Container]
    let menuComponents =["col-lg-5","col-md-5",classes.menu_Components]
    console.log(menuComponents.join(" "));
    return (<div>
             <h1 className={classes.Welcome_heading}>Welcome to Demo Shop</h1>
             <h1 className={classes.order_greating} >What would to like Order Today!!😍</h1>
             <div className={classes.menuWrapper}>
                    <div className={menuContainer.join(" ")}>
                        <div className={menuComponents.join(" ")}>
                        <img src={BurgerMenuImg} alt="Trulli"  className={classes.menuImg}/>
                        <Button btnType="Order" clicked={props.menuHandler}>Order Now</Button>
                        </div>
                        <div className={menuComponents.join(" ")}>
                        <img src={SalaMenuImg} alt="Trulli"  className={classes.menuImg}/>
                        <Button btnType="Order">Order Now</Button>
                        </div>

                        <div className={menuComponents.join(" ")}>
                        <img src={TrioMenuImg} alt="Trulli"  className={classes.menuImg}/>
                        <Button btnType="Order">Order Now</Button>
                        </div>
                        <div className={menuComponents.join(" ")}>
                        <img src={SnackMenuImg} alt="Trulli"  className={classes.menuImg}/>
                        <Button btnType="Order">Order Now</Button>
                        </div>
                    </div>
             </div>
       
        </div>)
}
export default home;