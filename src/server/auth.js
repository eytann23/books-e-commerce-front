import Axios from 'axios';


export const signInToSite = async (email, password) => {
    try{
        const res = await Axios.post(
            process.env.REACT_APP_SIGNIN, 
            {email,password}
        );
        return{
            token: res.data.token,
            user: {username: res.data.user.username, cart: res.data.user.cart}
        } 

    }catch(err){
        if(err.response && err.response.status === 400){
            throw new Error ("Email or password are invalid")
        }
    }
}

export const signUpToSite = async (username,email, password) => {
    try{
        const res = await Axios.post(
            process.env.REACT_APP_SIGNUP, 
            {username,email,password}
        );
        return{
            token: res.data.token,
            user: {username: res.data.user.username, cart: res.data.user.cart}
        }

    }catch(err){
        // if(err.response && err.response.data.keyValue.email===email){
            throw new Error ("Email address is already in use")
        // }
    }
}

export const signOutOfSite = async (token) => {
    try{
        const res = await Axios.post(
            process.env.REACT_APP_SIGNOUT, 
            {token},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return res;
    }catch(err){
            throw new Error (err.message)
    }
}

export const updateUserCart = async (token,cart) => {
    console.log(cart);
    try{
        const res = await Axios.post(
            process.env.REACT_APP_UPDATE_CART,
            {cart:[...cart]},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return res;
    }catch(err){
            throw new Error (err.message)
    }
}