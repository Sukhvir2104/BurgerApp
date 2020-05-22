import React,{Component} from "react";
//import classes from "./Modal.css";
import CheckoutSummary from "../../components/orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";
class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:null
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        for(let param of query.entries()){
            if(param[0]==="price"){
                this.setState({totalPrice:param[1]})
            }
            else{
                ingredients[param[0]]= +param[1];
            }
            
        }
        this.setState({ingredients:ingredients});
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
            <CheckoutSummary ingredients={this.state.ingredients}
                 chekoutCanceled={this.chekoutCanceled}
                 chekoutContinued={this.chekoutContinued} 
             />
             <Route path={this.props.match.url+"/contact-data"} 
             render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
        </div>
        );
   }
}
export default Checkout;