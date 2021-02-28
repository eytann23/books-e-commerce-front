import React, { createContext, useContext, useReducer } from 'react';
import { getUserFromCookie } from '../cookies/cookies';
import cartReducer, { initCartState } from '../reducers/cartReducer';



export const CartContext = createContext();

const CartContextProvider = (props) =>{
    const cookieUserData = getUserFromCookie();
    const cartData=cookieUserData ? cookieUserData.user.cart : initCartState;
    const [cartState,cartDispatch]=useReducer(cartReducer,cartData)


    return(
        <CartContext.Provider value={{cartState,cartDispatch}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;