//cart=[333415,434632,452356] = array of id
//optinal [{id:16235,quantity:2},{id:95135,quantity:1}]

export let initCartState=[];

const cartReducer = (cartState, action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return [
                ...cartState,
                action.productId
            ]
        
        case "REMOVE_FROM_CART":
            return (
                cartState.filter((id)=>id!==action.productId)
            )
    }
}

export default cartReducer;