import React, { Component } from "react";
import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/authA";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {updateObject,checkValidity} from "../../store/shared/utility";
class Auth extends Component{
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail:true,
                   // minLength:5,
                  //  maxLength:15
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6,
                    //maxLength:15
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }
    componentDidMount(){
        //----------------------------if you did not add any ingredient and you just went to signup page and after 
        // signup it will show you the home page not the checkout page
        if(!this.props.building && this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectPath();
        }
    }


    inputChangedHandler = (event,controlName)=>{
        const updateControls =updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        });
        this.setState({controls:updateControls})
    }
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    switchAuthModeHandler= ()=>{
        this.setState(prevState =>{
            return{isSignup:!prevState.isSignup};
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form=<form onSubmit={this.submitHandler} > 
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
        <Button  btnType="Success" >SUBMIT</Button>
        </form>
        if(this.props.loading){
            form=<Spinner />
        }
        let errorMessage = null;
        if(this.props.error){
        errorMessage=<p>{this.props.error.message}</p>
        }
        let authRedirect =null
        if(this.props.isAuthenticated){
            authRedirect =<Redirect to={this.props.authRedirectPath} />
        }
      return(
          <div className={classes.Auth}>
              {authRedirect}
              {errorMessage}
              {form}
              <Button  btnType="Danger"
              clicked={this.switchAuthModeHandler}
      >SWITCH TO  {this.state.isSignup ? "SIGNIN" :"SIGNUP"}</Button>
          </div>
      );
    }
}
const mapStateToProps = state =>{
    return{
        loading:state.authR.loading,
        error:state.authR.error,
        isAuthenticated: state.authR.token !== null,
        building: state.burgerBuilerR.building,
        authRedirectPath:state.authR.authRedirectPath
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath("/"))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);