import React, { createContext, useContext, useEffect, useReducer } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';
import { updateUserCart } from '../server/auth';
import { CartContext } from './cartContext';

export const UserContext = createContext();

const UserContextProvider = (props)=>{
    const [userData,dispatchUserData] = useReducer(loginReducer, userDataInitialState);
    const {cartState}=useContext(CartContext);
    // useEffect(()=>{
    //     if(!!userData.user){
    //         updateUserCart(userData.token,cartState)
    //         console.log(userData," updated cart");
    //     }
        
        
    // },[cartState])

    return(
        <UserContext.Provider value={ {userData, dispatchUserData} }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;