export const userDataInitialState = { user: null, token: "" };

const loginReducer = (userData, action) => {
    
    switch (action.type) {
        case "SIGNIN":
            if (action.user.username==="admin")
                return { user: { ...action.user }, token: action.token,isAdmin:true };
            return { user: { ...action.user }, token: action.token };
        case "SIGNOUT":
            return { user: null, token: "" };
        default:
            return { ...userData };
    }
};

export default loginReducer;
