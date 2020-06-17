import React from "react";
//import classes from "./Modal.css";
import CheckoutSummary from "../../components/orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route,Redirect} from "react-router-dom";
import { connect } from "react-redux";
const checkout= (props)=>{
    const chekoutCanceled=()=>{
        return props.history.goBack();
    }
   const chekoutContinued=()=>{
        return props.history.replace("/checkout/contact-data");
    }
    

       let summary=<Redirect path="/"/>
       if(props.ings){
           const purchasedRedirect = props.purchased ? <Redirect path="/" />:null
           summary=(
            <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={props.ings}
                     chekoutCanceled={chekoutCanceled}
                     chekoutContinued={chekoutContinued} 
                 />
                 <Route path={props.match.url+"/contact-data"} 
                 component={ContactData} />
            </div>
            )
       }
    return summary
}
 const mapStateToProps = state =>{
     return{
        ings:state.burgerBuilerR.ingredients,
        purchased:state.orderR.purchased
     }
 };
//  const mapDispatchToProps = dispatch =>{
// //     return{
      
// //     }
// // };
export default connect(mapStateToProps)(checkout);