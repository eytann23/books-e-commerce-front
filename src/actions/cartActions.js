export const addToCart = (productISBN,quantity) =>({
    type: "ADD_TO_CART",
    productISBN,
    quantity
})

export const removeFromCart = (productISBN) =>({
    type: "REMOVE_FROM_CART",
    productISBN
})

export const updateItemQuantity = (productISBN,quantity) =>({
    type: "UPDATE_ITEM_QUANTITY",
    productISBN,
    quantity
})

export const setCart = (cart) =>({
    type: "SET_CART",
    cart
})