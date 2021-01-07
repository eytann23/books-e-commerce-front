export const signInAction = ({ user, token }) => ({
    type: "SIGNIN",
    user,
    token
});

export const signOutAction=()=>({
    type: "SIGNOUT",
})