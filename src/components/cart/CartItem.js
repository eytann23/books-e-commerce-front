import React, { useContext, useEffect, useState } from 'react';
import { removeFromCart, updateItemQuantity } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import { getBookById } from '../../server/db';

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
    //let book = await getBookById(props.item.id);
    
    useEffect(()=>{
        getBookById(props.item.id)
            .then((book)=>setItemState(
                {
                    details: book,
                    quantity:props.item.quantity
                }
            ))
    },[])

    //Remove
    const onClickRemoveFromCart=(productId)=>{
        cartDispatch(updateItemQuantity(productId,0))
        cartDispatch(removeFromCart(productId));
        props.updateTotalPrice();
        
    }
    //Change quantity
    const onChangeItemQuantity=(productId,event)=>{
        const quantity=event.target.value;
        cartDispatch(updateItemQuantity(productId,quantity))
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
                onChange={(event)=>onChangeItemQuantity(props.item.id,event)}
            />
            
            <button onClick={()=>onClickRemoveFromCart(props.item.id)}>X</button>
        </div>
    )
}

export default CartItem;