import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getUserFromCookie, saveUserOnCookie } from '../cookies/cookies';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';
import { updateUserCart } from '../server/auth';
import { CartContext } from './cartContext';

export const UserContext = createContext();

const UserContextProvider = (props)=>{
    const cookieUserData = getUserFromCookie();
    const [userData,dispatchUserData] = useReducer(loginReducer,cookieUserData || userDataInitialState);
    const {cartState}=useContext(CartContext);

    //For users = updating user cart and cookie after adding/removing items (not including quantity changes)
    //For guests = updating sessionStorage
    useEffect(()=>{
        if(!!userData.user){
            sessionStorage.removeItem('cart');
            updateUserCart(userData.token,cartState);//try/catch is missing
            const userDataWithUpdatedCart={...userData};
            userDataWithUpdatedCart.user.cart=cartState;
            saveUserOnCookie(userDataWithUpdatedCart);
        }else{
            const cartJSON=JSON.stringify(cartState);
            sessionStorage.setItem('cart', cartJSON);
        }
    },[cartState])

    return(
        <UserContext.Provider value={ {userData, dispatchUserData} }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;