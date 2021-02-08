import React, { useState } from 'react';
import { changeNumberDisplayFormat } from '../../utils/changeNumberFormat';

const CartTotalBox = (props)=>{

    const [isCheckoutEnable,setIsCheckoutEnable]=useState(false);

    const onClickCheckout=()=>{
        console.log("Checkout");
    }


    
    return(
        
        <div className={props.total?"total-box":"total-box disable"}>
            <h3>Total Price: <span>{changeNumberDisplayFormat(props.total)}</span>$</h3>
            <button onClick={onClickCheckout}>CHECKOUT</button>
        </div>
    
    )
}


export default CartTotalBox;