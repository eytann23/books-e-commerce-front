import React, { useContext, useEffect, useState } from 'react';

const CartTotalBox = (props)=>{
    return(
        <div className="total-box">
            <h3>Total Price: {props.total.toFixed(2)}$</h3>
            <button>Checkout</button>
        </div>
    )
}


export default CartTotalBox;