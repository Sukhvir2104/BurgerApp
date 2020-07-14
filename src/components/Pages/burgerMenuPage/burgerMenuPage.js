import React, { useEffect } from "react";
import classes from "./burgerMenuPage.css";
import Transition from "react-transition-group/Transition";

const animationTiming = {
    enter: 1000,
    exit: 1000
};
const burgerMenuPage =(props)=>{
    const menuContentWrapper =["row",classes.menuContentWrapper];
    const menuImgwrapper=["col-lg-3","col-md-4","col-sm-5",classes.menuImgwrapper];
    const menuContent=["col-lg-9","col-md-8","col-sm-7",classes.menuContent];
   

 return(
     <div >
         <div className={menuContentWrapper.join(" ")} >
             <div  className={menuImgwrapper.join(" ")}>
             <img src={props.imgSrc} alt="Trulli" className={classes.menuImg}/>
             </div>
             <div className={menuContent.join(" ")}>
                <h3>{props.name}</h3>
                <h5>${props.price.toFixed(2)}</h5> <br/>
                <p>{props.desc}</p>

             </div>
             <div className={classes.selectDiv}>
              <button type="submit" onClick={()=>props.SelectOrder(props.id)} 
               style={props.selectToggal ? {backgroundColor:"#944317" ,color:"#eee"}:{backgroundColor:"#eee"}}
              className={classes.selectButton}>
                 {props.selectToggal ? "Remove" :"Select"}
                  </button>  
             </div>
        {/* -----------------------annimation on quantitySelect Buttons ------------ */}
             <Transition
                in={props.selectToggal}
                timeout={animationTiming}
                mountOnEnter
                unmountOnExit
               
                >
                {state =>{
                 const cssClasses = [
                    classes.quantityButtonWrapper,
                    state==="entering" ? classes.ModalOpen : 
                    state==="exiting" ? classes.ModalClosed : null
                  ];
                  const cssClasses1 = [
                    classes.quantityButtonContainer
                  ];
                return(
             <div className={cssClasses.join(" ")}>
                  <div className={cssClasses1.join(" ")} >
                    <button disabled={!props.lessButtonD} className={classes.quantitySub}
                     onClick={()=>props.quantitySub(props.id)}>-</button>
                   <p  className={classes.quantityText} >{props.quantity}</p>
                    <button  className={classes.quantityAdd}
                    onClick={()=>props.quantityAdd(props.id)}>+</button>
                  </div>
             </div>
                )}}
                </Transition>

            
          </div>
       
         
     </div>
    
	);
}
export default burgerMenuPage;