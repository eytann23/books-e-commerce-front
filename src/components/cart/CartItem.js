import React, { useContext, useEffect, useState } from 'react';
import { removeFromCart, updateItemQuantity } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import { getBookByISBN } from '../../server/db';

const CartItem=(props)=>{
    const initialItemState ={
            details: {img:"/",name:"",author:"",price:""},
            quantity:props.item.quantity
        }
    const {cartDispatch} = useContext(CartContext);
    const [itemState,setItemState] = useState(initialItemState)

    //Next:
    //itemState only for quantity ?
    //and then:
    //let book = await getBookByproductISBN(props.item.isbn);
    
    useEffect(()=>{
        try {
            getBookByISBN(props.item.isbn)
            .then((book)=>setItemState(
                {
                    details: book.data,
                    quantity:props.item.quantity
                }
            ))
        } catch (error) {
            console.log(error)
        }
        
    },[])

    //Remove
    const onClickRemoveFromCart=(productISBN)=>{
        cartDispatch(updateItemQuantity(productISBN,0))
        cartDispatch(removeFromCart(productISBN));
        props.updateTotalPrice();
        
    }
    //Change quantity
    const onChangeItemQuantity=(productISBN,event)=>{
        const quantity=event.target.value;
        cartDispatch(updateItemQuantity(productISBN,quantity))
        setItemState({...itemState,quantity})
        props.updateTotalPrice();
    }
    
    return (
        <div className="cart-item">
            <img src={itemState.details.img} alt=""/>
            <p>{itemState.details.name}</p>
            <p>{itemState.details.price}</p>
            <input 
                type="number" 
                value={itemState.quantity}
                min="1"
                max="99"
                onKeyPress={(e)=>{e.preventDefault()}}               
                onChange={(event)=>onChangeItemQuantity(props.item.isbn,event)}
            />
            
            <button onClick={()=>onClickRemoveFromCart(props.item.isbn)}>X</button>
        </div>
    )
}

export default CartItem;