import React,{useState, useEffect} from "react";
import classes from "./MenuPage.css";
import BurgerPage from "../../../components/Pages/burgerMenuPage/burgerMenuPage";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
const menuPage =(props)=>{
       const {onfetchBurgerMenu} = props;
    useEffect(()=>{
      onfetchBurgerMenu();
         
   

   },[onfetchBurgerMenu])
 

    const selectOrderHandler=(id)=>{
      props.onToggalSelect(id)
    }
    const too=props.menuBurger.map((ig)=>ig.IsSelect)
    let BurgerMenu = props.menuBurger.map((ig,index)=><BurgerPage key={index} SelectOrder={selectOrderHandler} selectToggal={too[index]}
      imgSrc={ig.BurgerImage} name={ig.Name} price={ig.Price} desc={ig.Description} id={ig.id} 
      />)
 return(
     <div >
         {BurgerMenu}
         <div className={classes.OrderButtonDiv}>                    
            <button className={classes.OrderButton}
                disabled={!props.selectToggal}
                onClick={props.ordered}
                > Add To Cart</button>
        </div>
     </div>

	);
}
const mapStateToProps = state =>{
   return{
       menuBurger:state.menuR.BurgerMenu,
       loading:state.menuR.loading,
       menuId:state.menuR.MenuId
   }
}
const mapDispatchToProps = dispatch =>{
   return{
       onfetchBurgerMenu:()=>dispatch(actions.fetchBurgerMenu()),
       onToggalSelect:(id)=>dispatch(actions.toggleSelect(id))
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(menuPage,axios)) ;