import React, { useEffect,Suspense } from 'react';
import './App.css';
import Layout from "./hoc/layout/layout";
import * as actions from "./store/actions/index";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch ,Redirect} from "react-router-dom";
import OrderDetails from './containers/Orders/OrderDetails/OrderDetails';
import Home from "./containers/Home/HomeCon";
import Logout from "./containers/Auth/logout/logout";
import MenuPage from "./containers/Home/MenuPages/MenuPages";

import {connect} from "react-redux";

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});


const app=(props)=> {
const  {onTryAutoSignup}=props;
   useEffect(()=>{
    onTryAutoSignup()
   },[onTryAutoSignup]);
   
    let routes =(
          <Switch>
               
              <Route path="/auth" render={(props)=> <Auth {...props} /> }/>
              <Route path="/burgermenu" exact render={(props)=> <MenuPage {...props} /> } />
              <Route path="/burgerBuilder" exact component={BurgerBuilder} />
              <Route path="/" render={(props)=> <Home {...props} /> }/>
              <Redirect to="/" />
          </Switch>
         );
    if(props.isAuthenticated){
      routes=(
        <Switch>
              <Route path="/orders/:id"  render={(props)=><OrderDetails {...props} />} />
              <Route path="/burgermenu" exact render={(props)=> <MenuPage {...props} /> } />
              <Route path="/checkout" render={(props)=> <Checkout {...props} />} />
              <Route path="/orders" render={(props)=> <Orders {...props} />} />
              <Route path="/logout" component={Logout} />
              <Route path="/auth" render={(props)=> <Auth {...props} />} />
              
              <Route path="/burgerBuilder" exact component={BurgerBuilder} />
              <Route path="/" render={(props)=> <Home {...props} /> }/>
              <Redirect to="/" />
          </Switch>
      );
    }
    return (
      <div>
        <Layout name="sukh">
          <Suspense fallback ={<p>loading ...</p>}>
             {routes}
          </Suspense>
          
        </Layout>
      </div>
    );
}
const mapStateToProps = state =>{
  return{
     
      isAuthenticated:state.authR.token !== null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
     onTryAutoSignup:()=> dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(app);
