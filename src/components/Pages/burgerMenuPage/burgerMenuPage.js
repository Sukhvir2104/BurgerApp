import React, { useEffect } from "react";
import classes from "./burgerMenuPage.css";


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
                <h5>{props.price}</h5> <br/>
                <p>{props.desc}</p>

             </div>
             <div className={classes.selectDiv}>
              <button type="submit" onClick={()=>props.SelectOrder(props.id)} 
               style={props.selectToggal ? {backgroundColor:"#944317" ,color:"#eee"}:{backgroundColor:"#eee"}}
              className={classes.selectButton}>
                  {console.log(props.selectToggal)
                  }
                 {props.selectToggal ? "Remove" :"Select"}
                  </button>
             </div>
         </div>
       
         
     </div>
    
	);
}
export default burgerMenuPage;