import React, { createContext, useReducer } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';

export const UserContext = createContext();

const UserContextProvider = (props)=>{
    const [userData,dispatchUserData] = useReducer(loginReducer, userDataInitialState);


    return(
        <UserContext.Provider value={ {userData, dispatchUserData} }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;