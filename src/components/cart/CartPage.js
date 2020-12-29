import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';

const CartPage =()=>{
    const {cartState} = useContext(CartContext);
    useEffect(()=>{
        console.log(cartState);
    })

    return(
        <div className="page">
            <h1>My Cart</h1>
        </div>
    )
}

export default CartPage;