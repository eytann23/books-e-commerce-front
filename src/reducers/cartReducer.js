//cart=[333415,434632,452356] = array of id
//optinal [{id:16235,quantity:2},{id:95135,quantity:1}]

export let initCartState=[];

const cartReducer = (cartState, action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            const indexOfItem = cartState.findIndex((item)=>item.id===action.productId);
                if (indexOfItem===-1){
                    return [
                        ...cartState,
                        {
                            id: action.productId,
                            quantity: 1
                        }
                    ]
                }else{
                    cartState[indexOfItem].quantity++;
                    return [...cartState];
                }
                
        case "REMOVE_FROM_CART":
            return (
                [...cartState.filter((item)=>parseInt(item.id)!==parseInt(action.productId))]
            )
        
        case "UPDATE_ITEM_QUANTITY":
            const index = cartState.findIndex((item)=>parseInt(item.id)===parseInt(action.productId));
            cartState[index].quantity=action.quantity;
            return cartState;

        default:
            return cartState;
    }
}

export default cartReducer;