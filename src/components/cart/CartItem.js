import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { removeFromCart, updateItemQuantity } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import { UserContext } from '../../context/userContext';
import { saveUserOnCookie } from '../../cookies/cookies';
import { updateUserCart } from '../../server/auth';
import { getBookByISBN } from '../../server/db';
import { changeNumberDisplayFormat } from '../../utils/changeNumberFormat';
import InputNumber from '../shared/InputNumber';

const CartItem=(props)=>{
    const initialItemState ={
            details: {img:"/",name:"",author:"",price:""}
        }
    const {cartState,cartDispatch} = useContext(CartContext);
    const {userData} = useContext(UserContext);
    const [itemState,setItemState] = useState(initialItemState)
    const [itemQuantity,setItemQuantity] = useState(props.item.quantity)
    
    const [display, setDisplay] = useState(false);
    const [flag, toggleFlag] = useState(true);
    
    useEffect(()=>{
            getBookByISBN(props.item.isbn)
            .then((book)=>setItemState({details: book.data}))
            .then(()=>{setDisplay(true)})
            .catch((error)=>{
                console.log(error)
            })
        return (()=>{
            
        })

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
        cartDispatch(updateItemQuantity(productISBN,itemQuantity))//cartContext
        props.updateTotalPrice();

        //updating db and cookie for users
        if(userData.user&&display){
            if(flag){
                setTimeout(()=>{
                    try{
                        updateUserCart(userData.token,cartState);
                        const userDataWithUpdatedCart={...userData};
                        userDataWithUpdatedCart.user.cart=cartState;
                        saveUserOnCookie(userDataWithUpdatedCart);
                    }catch(err){
                        console.log(err)
                    }
                    toggleFlag(true)
                },2000)
            } 
            toggleFlag(false)
        }else{
            const cartJSON=JSON.stringify(cartState);
            sessionStorage.setItem('cart', cartJSON);
        }
        
    }
    
    const history=useHistory();
    const onClickItemImage=()=>{
        history.push(`/product/${props.item.isbn}`)
    }

    return (
        (display)&&
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