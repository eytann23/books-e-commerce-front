import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { setCart } from "../../actions/cartActions";
import { signInAction } from "../../actions/loginActions";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { signInToSite } from "../../server/auth";


const SignInForm = (props) => {
	const {dispatchUserData}=useContext(UserContext);
	const {cartDispatch} = useContext(CartContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEmailinputValid, setIsEmailInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
	const [errorMessage,setErrorMessage] = useState("");

	useEffect(()=>{
		if (props.errorMessage!=="")
			setErrorMessage([props.errorMessage]);
	},[props.errorMessage]);

	const isFormInavlid = () => {
		return email === "" || password === "";
	};

	const onBlurEmailInput = (event) => {
		const emailValue = event.target.value.trim();
        setEmail(emailValue);
		setIsEmailInputValid(emailValue !== "");
	};

	const onBlurPasswordInput = (event) => {
		const passwordValue = event.target.value.trim();
		setPassword(passwordValue === "" ? "" : passwordValue);
		setIsPasswordInputValid(passwordValue !== "");
	};

	const history = useHistory();
	const onSubmitform = (event) => {
		event.preventDefault();
        console.log("login form:", email, password);
        
        signInToSite(email,password).then(
            (userData)=>{
				dispatchUserData(signInAction(userData));
				cartDispatch(setCart(userData.user.cart));
                history.push("/home");
            },
            (err)=>{
                if (err.message === "Email or password are invalid")
                    setErrorMessage(err.message);
            }
        )
	};

	const onClickSignUp = () => {
		props.setIsSignInMode(false);
	};

	return (
		<div className="signin-form">
			<h3>Sign In</h3>

		{errorMessage!=="" && <div className="error-message">{errorMessage}</div>}

			<form onSubmit={onSubmitform}>
				<input placeholder="Email" onBlur={onBlurEmailInput} />
				{!isEmailinputValid && <div className="invalid-message">You must enter your email.</div>}
				<input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
				{!isPasswordInputValid && <div className="invalid-message">You must enter your password.</div>}
				<div className="signin-form__nav">
					<button type="submit" disabled={isFormInavlid()}>Submit</button>
					<div onClick={onClickSignUp}>Sing Up</div>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;