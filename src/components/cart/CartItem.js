import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { removeFromCart, updateItemQuantity } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import { getBookByISBN } from '../../server/db';
import { changeNumberDisplayFormat } from '../../utils/changeNumberFormat';
import InputNumber from '../shared/InputNumber';

const CartItem=(props)=>{
    const initialItemState ={
            details: {img:"/",name:"",author:"",price:""}
        }
    const {cartDispatch} = useContext(CartContext);
    const [itemState,setItemState] = useState(initialItemState)
    const [itemQuantity,setItemQuantity] = useState(props.item.quantity)

    
    useEffect(()=>{
        try {
            getBookByISBN(props.item.isbn)
            .then((book)=>setItemState(
                {
                    details: book.data
                }
            ))
        } catch (error) {
            console.log(error)
        }
        
    },[props.item.isbn])

    useEffect(()=>{
        onChangeItemQuantity();
    },[itemQuantity])

    //Remove
    const onClickRemoveFromCart=(productISBN)=>{
        cartDispatch(updateItemQuantity(productISBN,0))
        cartDispatch(removeFromCart(productISBN));
        props.updateTotalPrice();
        
    }
    //Change quantity on cart
    const onChangeItemQuantity=()=>{
        const productISBN=props.item.isbn;
        cartDispatch(updateItemQuantity(productISBN,itemQuantity))
        props.updateTotalPrice();
        // console.log("Item: "+itemQuantity);
    }
    
    const history=useHistory();
    const onClickItemImage=()=>{
        history.push(`/product/${props.item.isbn}`)
    }

    return (
        <div className="cart-item">
            <img src={itemState.details.img} alt="" onClick={onClickItemImage}/>
            <p className="name__item">{itemState.details.name}</p>
            <p>{changeNumberDisplayFormat(itemState.details.price)}$</p>
            
            <InputNumber initValue={itemQuantity} setItemQuantity={setItemQuantity}/>

            <div className="total-price__item">{changeNumberDisplayFormat(itemState.details.price*itemQuantity)} $</div>
            <button onClick={()=>onClickRemoveFromCart(props.item.isbn)}>X</button>
        </div>
    )
}

export default CartItem;