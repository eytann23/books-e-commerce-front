import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";


const SignInPage = () => {
	const [isSignInMode, setIsSignInMode] = useState(true);

	return (
		<div className="page signin-page">
			<div className="signin-page__form">
				{isSignInMode?
				<SignInForm setIsSignInMode={setIsSignInMode}/>
				:
				<SignUpForm setIsSignInMode={setIsSignInMode}/>}
                    
			</div>
		</div>
	);
};

export default SignInPage;