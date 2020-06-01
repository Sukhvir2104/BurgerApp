import React,{Component} from "react";
//import classes from "./Modal.css";
import CheckoutSummary from "../../components/orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route,Redirect} from "react-router-dom";
import { connect } from "react-redux";
class Checkout extends Component{
    chekoutCanceled=()=>{
        return this.props.history.goBack();
    }
    chekoutContinued=()=>{
        return this.props.history.replace("/checkout/contact-data");
    }
   render(){
       let summary=<Redirect path="/"/>
       if(this.props.ings){
           const purchasedRedirect = this.props.purchased ? <Redirect path="/" />:null
           summary=(
            <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                     chekoutCanceled={this.chekoutCanceled}
                     chekoutContinued={this.chekoutContinued} 
                 />
                 <Route path={this.props.match.url+"/contact-data"} 
                 component={ContactData} />
            </div>
            )
       }
    return summary
   }
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
export default connect(mapStateToProps)(Checkout);