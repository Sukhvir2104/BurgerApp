import React,{Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import {updateObject,checkValidity} from "../../../store/shared/utility";

class ContactData extends Component {
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:15
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:15
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:11,
                    maxLength:20
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid:true,
                validation:{}
            }
        },
        isFormValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId:this.props.userId,
            
        }
        // console.log(this.props.userId)
        this.props.onOrderBurger(order,this.props.token);
    //    axios.post("/order.json",order)
    //    .then(response=> {
    //        this.setState({loading:false})
    //        this.props.history.push("/")
    //    }) 
    //    .catch(err=> this.setState({loading:false}));

    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true

        })
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier]:updatedFormElement
        });
     
        let inFormValid =true;
        for(let inputidentifier in updatedOrderForm ){
            inFormValid=updatedOrderForm[inputidentifier].valid && inFormValid
        }
        // console.log(inFormValid);
        
        this.setState({orderForm: updatedOrderForm,isFormValid:inFormValid});
         //console.log(this.state.isFormValid);
    }
    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form=<form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                       changed={(event) => this.inputChangedHandler(event, formElement.id)}
                       />
                ))}
        <Button  btnType="Success" disabled={!this.state.isFormValid} >ORDER</Button>
    </form>
     
     if(this.props.loading){
         form=<Spinner />
     }
        return(
            <div className={classes.ContactData}>
                <h1>Enter your contac data</h1>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilerR.ingredients,
        price:state.burgerBuilerR.totalPrice,
        loading:state.orderR.loading,
        token:state.authR.token,
        userId:state.authR.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));