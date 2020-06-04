import React, { useEffect,useState} from "react";
import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/authA";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {updateObject,checkValidity} from "../../store/shared/utility";
const auth=(props)=>{
    const [authForm,setAuthForm]=useState({
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
        });
        
        const [isSignup,setIsSignup]=useState(true);

        const{onSetAuthRedirectPath,building,authRedirectPath}=props;
       useEffect(()=>{
           //----------------------------if you did not add any ingredient and you just went to signup page and after 
        // signup it will show you the home page not the checkout page
        if(!building && authRedirectPath !== "/"){
            onSetAuthRedirectPath();
        }
       },[onSetAuthRedirectPath,building,authRedirectPath]);


    const inputChangedHandler = (event,controlName)=>{
        const updateControls =updateObject(authForm,{
            [controlName]:updateObject(authForm[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,authForm[controlName].validation),
                touched:true
            })
        });
        setAuthForm(updateControls);
    }
    const submitHandler = (event) =>{
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignup);
    }
    const switchAuthModeHandler= ()=>{
        setIsSignup(!isSignup);
    }

        const formElementsArray = [];
        for (let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            });
        }
        let form=<form onSubmit={submitHandler} > 
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
        <Button  btnType="Success" >SUBMIT</Button>
        </form>
        if(props.loading){
            form=<Spinner />
        }
        let errorMessage = null;
        if(props.error){
        errorMessage=<p>{props.error.message}</p>
        }
        let authRedirect =null
        if(props.isAuthenticated){
            authRedirect =<Redirect to={props.authRedirectPath} />
        }
      return(
          <div className={classes.Auth}>
              {authRedirect}
              {errorMessage}
              {form}
              <Button  btnType="Danger"
              clicked={switchAuthModeHandler}
      >SWITCH TO  {isSignup ? "SIGNIN" :"SIGNUP"}</Button>
          </div>
      );
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
export default connect(mapStateToProps,mapDispatchToProps)(auth);