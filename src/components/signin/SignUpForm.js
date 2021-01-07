import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { signInAction } from '../../actions/loginActions';
import { UserContext } from '../../context/userContext';
import { signUpToSite } from '../../server/auth';


const SignUpForm = (props) => {
    const {dispatchUserData}=useContext(UserContext);

    const [inputClasses, setInputClasses] = useState(["", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", ""]);
    const [validInputs, setValidInputs] = useState([false, false, false, false]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [errorMessage,setErrorMessage] = useState("");

    const isFormInvalid = () => {
        return validInputs.includes(false);
    };

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isvalidInput) => {
            const newInavlidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInavlidMessages[inputindex] = message;
            setInvalidMessages(newInavlidMessages);
            newInputClasses[inputindex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputindex] = isvalidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs("", "", true);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false);
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false);
        }
    };

    const onBlurUsername = (event) => {
        const newUsername = event.target.value.trim();
        const isUsenamevalid = (value) => {
            return value.length>1;
        };
        validateInput(
            newUsername,
            0,
            isUsenamevalid,
            setUsername,
            "You must enter a username",
            "Username must be longer"
        );
    };


    const onBlurEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            1,
            validator.isEmail,
            setEmail,
            "You must enter your email",
            "Email invalid"
        );
    };

    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            return value.length>=8;
        };
        validateInput(
            newPassword,
            2,
            isPasswordValid,
            setPassword,
            "You must enter a password",
            "Password must have at least 8 characters"
        );
    };

    const onBlurPasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = (value) => {
            return password === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            3,
            isPasswordRepeatedValid,
            () => { },
            "You must enter again your password",
            "Password must be repeated exactly"
        );
    };
    const history = useHistory();
    const onSubmitform = (event) => {
        event.preventDefault();

        signUpToSite(username,email,password).then(
            (userData)=>{
                console.log(userData)
                dispatchUserData(signInAction(userData))
                history.push("/home");
            }
        ).catch((err)=>{
            if (err.message === "Email address is already in use")
                setErrorMessage(err.message);
        })
    };

    const onClickLogin = () => {
        props.setIsSignInMode(true);
    };

    return (
        <div className="signin-form">
            <h3>Sign Up</h3>

            {errorMessage!=="" && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={onSubmitform}>
                <input placeholder="Username" className={inputClasses[0]} onBlur={onBlurUsername} />
                {invalidMessages[0] !== "" && <div className="invalid-message">{invalidMessages[0]}</div>}
                <input placeholder="Email" className={inputClasses[1]} onBlur={onBlurEmail} />
                {invalidMessages[1] !== "" && <div className="invalid-message">{invalidMessages[1]}</div>}
                <input type="password" placeholder="Password" className={inputClasses[2]} onBlur={onBlurPassword} />
                {invalidMessages[2] !== "" && <div className="invalid-message">{invalidMessages[2]}</div>}
                <input type="password" placeholder="Repeat on password" className={inputClasses[3]} onBlur={onBlurPasswordRepeated} />
                {invalidMessages[3] !== "" && <div className="invalid-message">{invalidMessages[3]}</div>}

                <div className="signin-form__nav">
                    <button type="submit" disabled={isFormInvalid()}>Submit</button>
                    <div onClick={onClickLogin}>Sing In</div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;