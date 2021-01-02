export const addToCart = (productId) =>({
    type: "ADD_TO_CART",
    productId
})

export const removeFromCart = (productId) =>({
    type: "REMOVE_FROM_CART",
    productId
})

export const updateItemQuantity = (productId,quantity) =>({
    type: "UPDATE_ITEM_QUANTITY",
    productId,
    quantity
})