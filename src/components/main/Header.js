import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import SearchBar from '../search/SearchBar';


const Header = (props) => {
	let history=useHistory();
	return(
		<div className="header">
			<div className="logo" onClick={()=>history.push("/")}>LOGO</div>
			<NavLink to="/home" activeClassName="header-active-link">Home</NavLink>
			<NavLink to="/cart" activeClassName="header-active-link">Cart</NavLink>
			<SearchBar/>
			<NavLink to="/signup" activeClassName="header-active-link">Sign Up</NavLink>
		</div>
	)
	
};

export default Header;