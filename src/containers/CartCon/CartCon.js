import React from "react";
import classes from "./CartCon.css"
import Cart from "../../components/Pages/Cart/Cart";
import CartSideBill from "../../components/Pages/Cart/CartSideBill/CartSideBill";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
const cartCon = (props)=>{
    const cartWrapper =["row",classes.cartWrapper];
    const leftContainer=["col-lg-8","col-md-8","col-sm-12",classes.leftContainer];
    const rightContainer=["col-lg-4","col-md-4","col-sm-12",classes.rightContainer];
    let CartOrder = <Spinner />
    let cartSideBill= ""
    let totalContainer ="";
    let checkoutButton ="";
    let cartLocalStorageData=JSON.parse(localStorage.getItem("BurgerData"));
    console.log(cartLocalStorageData)
    if(cartLocalStorageData){
        let selectedOrder= cartLocalStorageData.filter(ig=>ig.IsSelect===true);
        let totalAmount = selectedOrder.map(ig=>ig.Price * ig.Quantity).reduce(function(a, b){
            return a + b;
        }, 0)
        console.log(totalAmount);
        let gst = totalAmount * 0.10;
        let qst = totalAmount * 0.05;
        let total = gst + qst + totalAmount
        if(selectedOrder.length!==0){
            CartOrder = selectedOrder.map((ig,index)=> <Cart key={index} imageSrc={ig.BurgerImage} 
            Name={ig.Name} price={ig.Price} id={ig.id} quantity={ig.Quantity} 
             />)
    
             cartSideBill = selectedOrder.map((ig,index)=> <CartSideBill key={index} 
             Name={ig.Name} price={ig.Price.toFixed(2)} quantity={ig.Quantity}
              />)
              totalContainer=<div className={classes.cartTotalContainer} >
              <p>Amount : {totalAmount.toFixed(2)}</p>
              <p>Gst: 0.10 * {totalAmount.toFixed(2)} = {gst.toFixed(2)}</p>
              <p>Qst: 0.05 * {totalAmount.toFixed(2)} = {qst.toFixed(2)}</p>
              <p>Total = ${total.toFixed(2)}</p>
          </div>
          checkoutButton=""
        }else{
            CartOrder=<h1>You have not added any item in cart</h1>
        }
        
      }
    return(
        <div className={cartWrapper.join(" ")}>
            <div className={leftContainer.join(" ")}>
               {CartOrder}
            </div>
            <div className={rightContainer.join(" ")} style={cartSideBill==="" ? {backgroundColor:"#fff"}: {backgroundColor: "rgb(182, 245, 174)"}}>
                    {cartSideBill}<br />
                    <hr></hr>
                    {totalContainer} 
               <div className={classes.OrderButtonDiv} >
                   <button className={classes.OrderButton} style={{marginLeft:"17px"}}>
                       Checkout</button>
               </div>
            </div>
        </div>
    );
}


const mapStateToProps = state =>{
    return{
        cartOrder:state.menuR.BurgerMenu,
        loading:state.menuR.loading,
        menuId:state.menuR.MenuId,
       //  isAuth:state.authR.token !== null,
       //  token:state.authR.token,
       //  userId:state.authR.userId
    }
 }
//  const mapDispatchToProps = dispatch =>{
//     return{
//         onfetchBurgerMenu:()=>dispatch(actions.fetchBurgerMenu()),
//         onToggalSelect:(id)=>dispatch(actions.toggleSelect(id)),
//         onQuantityAdd:(id)=>dispatch(actions.quantitySelectAdd(id)),
//         onQuantitySub:(id)=>dispatch(actions.quantitySelectSub(id))
//     }
//  }
 export default connect(mapStateToProps)(withErrorHandler(cartCon,axios)) ;