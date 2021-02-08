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
		).then(()=>history.push("/"))
	}

	return(
		<div className="header">
			<div className="logo" onClick={()=>history.push("/")}>
			<svg width="24" height="24" viewBox="0 0 24 24"><path d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z"/></svg>
				LOGO
			</div>
			<SearchBar/>

			<div className="nav-links__containter">
				<NavLink to="/home" activeClassName="header-active-link">Home</NavLink>
				<NavLink to="/contact" activeClassName="header-active-link">Contact</NavLink>
				<NavLink to="/about" activeClassName="header-active-link">About</NavLink>
				<NavLink to="/cart" className="cart__button" activeClassName="header-active-link">
					<div className="cart__container">
						<svg width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-10.563-5l-2.937-7h16.812l-1.977 7h-11.898zm11.233-5h-11.162l1.259 3h9.056l.847-3zm5.635-5l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
						<div className="cart-quantity__label">{Object.keys(cartState).length}</div>
					</div>
				</NavLink>

				{!userData.user ? 
					<NavLink to="/signin" className="signin__button" activeClassName="header-active-link">Sign in</NavLink>
					:
					<div className="signout__container">
						<div className="hello-user__container">
							<h6>Hello</h6>
							<h5>{userData.user.username}</h5>
						</div>
						<div className="signout__button" onClick={onClickSignOut}>Sign out</div>
					</div>
				}
			</div>
			
			
		</div>
	)
	
};

export default Header;