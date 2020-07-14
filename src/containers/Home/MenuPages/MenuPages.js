import React,{useEffect} from "react";
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
    const quantityAdd=(id)=>{
       props.onQuantityAdd(id)
    }
    const quantitySub=(id)=>{
      props.onQuantitySub(id);
      
   }
//...................................to store data in cart--------
    const addToCartHandler =()=>{
      var oldItems = JSON.parse(localStorage.getItem('BurgerData')) || [];
      var newConcatArr = [...oldItems,...props.menuBurger]
      localStorage.setItem("BurgerData",JSON.stringify(newConcatArr));                
      return props.history.push("/cart");
 
    }

   let lessButtonDisable=props.menuBurger.map(id=>id.Quantity>=2);

    const SelectToggaleActivate=props.menuBurger.map((ig)=>ig.IsSelect);

    const cartButtonActivate = SelectToggaleActivate.find(ig=>ig===true);
    let BurgerMenu = <Spinner />

    if(props.menuBurger){
      BurgerMenu = props.menuBurger.map((ig,index)=><BurgerPage key={index} 
      SelectOrder={selectOrderHandler} selectToggal={SelectToggaleActivate[index]}
        imgSrc={ig.BurgerImage} name={ig.Name} price={ig.Price} desc={ig.Description}
         id={ig.id} lessButtonD={lessButtonDisable[index]}
        quantity={ig.Quantity} quantityAdd={quantityAdd} quantitySub={quantitySub}
        />)
    }
    
 return(
     <div >
         {BurgerMenu}
         <div className={classes.OrderButtonDiv}>                    
            <button className={classes.OrderButton}
                disabled={!cartButtonActivate}
                onClick={addToCartHandler}
                > Add To Cart</button>
        </div>
     </div>

	);
}
const mapStateToProps = state =>{
   return{
       menuBurger:state.menuR.BurgerMenu,
       loading:state.menuR.loading,
       menuId:state.menuR.MenuId,
      //  isAuth:state.authR.token !== null,
      //  token:state.authR.token,
      //  userId:state.authR.userId
   }
}
const mapDispatchToProps = dispatch =>{
   return{
       onfetchBurgerMenu:()=>dispatch(actions.fetchBurgerMenu()),
       onToggalSelect:(id)=>dispatch(actions.toggleSelect(id)),
       onQuantityAdd:(id)=>dispatch(actions.quantitySelectAdd(id)),
       onQuantitySub:(id)=>dispatch(actions.quantitySelectSub(id))
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(menuPage,axios)) ;