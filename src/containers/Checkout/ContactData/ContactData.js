import React,{useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import {updateObject,checkValidity} from "../../../store/shared/utility";

const contactData = (props)=>{
    
       const [orderForm,setOrderForm]=useState({
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
        });

       const  [isFormValid,setIsFormValid]=useState(false);

   const orderHandler=(event)=>{
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'  ( '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+' )';
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId:props.userId,
            Date:date
        }
         
        props.onOrderBurger(order,props.token);
    //    axios.post("/order.json",order)
    //    .then(response=> {
    //        this.setState({loading:false})
    //        this.props.history.push("/")
    //    }) 
    //    .catch(err=> this.setState({loading:false}));

    }
  const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value,orderForm[inputIdentifier].validation),
            touched:true

        })
        const updatedOrderForm = updateObject(orderForm,{
            [inputIdentifier]:updatedFormElement
        });
     
        let inFormValid =true;
        for(let inputidentifier in updatedOrderForm ){
            inFormValid=updatedOrderForm[inputidentifier].valid && inFormValid
        }
        // console.log(inFormValid);
        
        setOrderForm(updatedOrderForm);
        setIsFormValid(inFormValid);
         //console.log(this.state.isFormValid);
    }
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
        let form=<form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                       changed={(event) => inputChangedHandler(event, formElement.id)}
                       />
                ))}
        <Button  btnType="Success" disabled={!isFormValid} >ORDER</Button>
    </form>
     
     if(props.loading){
         form=<Spinner />
     }
        return(
            <div className={classes.ContactData}>
                <h1>Enter your contac data</h1>
                {form}
            </div>
        );
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
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData,axios));