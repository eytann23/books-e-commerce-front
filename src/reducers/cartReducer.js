//cart=[333415,434632,452356] = array of id
//optinal [{isbn:16235,quantity:2},{isbn:95135,quantity:1}]

export let initCartState=[];

const cartReducer = (cartState, action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            const indexOfItem = cartState.findIndex((item)=>item.isbn===action.productISBN);
                if (indexOfItem===-1){
                    return [
                        ...cartState,
                        {
                            isbn: action.productISBN,
                            quantity: 1
                        }
                    ]
                }else{
                    cartState[indexOfItem].quantity++;
                    return [...cartState];
                }
                
        case "REMOVE_FROM_CART":
            return (
                [...cartState.filter((item)=>parseInt(item.isbn)!==parseInt(action.productISBN))]
            )
        
        case "UPDATE_ITEM_QUANTITY":
            const index = cartState.findIndex((item)=>parseInt(item.isbn)===parseInt(action.productISBN));
            cartState[index].quantity=action.quantity;
            return cartState;
        
        case "SET_CART":
            return [...action.cart];

        default:
            return cartState;
    }
}

export default cartReducer;