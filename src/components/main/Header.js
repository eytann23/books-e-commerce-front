import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { setCart } from '../../actions/cartActions';
import { signOutAction } from '../../actions/loginActions';
import { CartContext } from '../../context/cartContext';
import { UserContext } from '../../context/userContext';
import { signOutOfSite, updateUserCart } from '../../server/auth';
import SearchBar from '../search/SearchBar';


const Header = () => {
	const {userData,dispatchUserData} = useContext(UserContext);
	const {cartState,cartDispatch} = useContext(CartContext);

	let history=useHistory();

	const onClickSignOut=()=>{
		const token = userData.token;
		updateUserCart(token,cartState)
			.then((res)=>
				{signOutOfSite(token).then(
					(res)=>{
						dispatchUserData(signOutAction());
						console.log("Signed out!", res);
						//emptying the cart
						cartDispatch(setCart([]))
					}
				)}
		)
	}

	
	return(
		<div className="header">
			<div className="logo" onClick={()=>history.push("/")}>LOGO</div>
			<NavLink to="/home" activeClassName="header-active-link">Home</NavLink>
			<NavLink to="/cart" activeClassName="header-active-link">Cart</NavLink>
			<SearchBar/>
			{!userData.user ? 
				<NavLink to="/signin" activeClassName="header-active-link">Sign in</NavLink>
				:
				<NavLink to="/home" onClick={onClickSignOut}>Sign out</NavLink>
			}
			
		</div>
	)
	
};

export default Header;