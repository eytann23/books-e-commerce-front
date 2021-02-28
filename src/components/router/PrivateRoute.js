import { useContext } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const PrivateRoute = ({component:Component},...rest) =>{
    const {userData}=useContext(UserContext);
    return(
        
        <Route
            {...rest}
            component={(props)=>(
                !!userData.user ?
                <Component {...props}/> :
                <Redirect to={{pathname:"/signin"}} />
            )}
        />
    )
}


export default PrivateRoute;