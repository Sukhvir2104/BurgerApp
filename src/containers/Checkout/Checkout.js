import React,{Component} from "react";
//import classes from "./Modal.css";
import CheckoutSummary from "../../components/orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";
import { connect } from "react-redux";
class Checkout extends Component{
    componentWillMount(){
    }
    chekoutCanceled=()=>{
        return this.props.history.goBack();
    }
    chekoutContinued=()=>{
        return this.props.history.replace("/checkout/contact-data");
    }
   render(){
    return(
        <div>
            <CheckoutSummary ingredients={this.props.ings}
                 chekoutCanceled={this.chekoutCanceled}
                 chekoutContinued={this.chekoutContinued} 
             />
             <Route path={this.props.match.url+"/contact-data"} 
             component={ContactData} />
        </div>
        );
   }
}
 const mapStateToProps = state =>{
     return{
        ings:state.ingredients
     }
 };
export default connect(mapStateToProps)(Checkout);