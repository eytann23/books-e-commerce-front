import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { UserContext } from '../../context/userContext';
import { updateUserPurchases } from '../../server/auth';
import { getBookByISBN } from '../../server/db';
import { changeNumberDisplayFormat } from '../../utils/changeNumberFormat';
import { setCart } from '../../actions/cartActions';

const CartTotalBox = (props)=>{

    const {cartState,cartDispatch} = useContext(CartContext);
    const {userData} = useContext(UserContext);
    const [error,setError]=useState(false);

    const onClickCheckout=async()=>{
        console.log("Checkout");
        if(userData.user){
            try{
                const newPurchases=[];
                for (let item of cartState){
                    const book = await getBookByISBN(item.isbn);
                    const price = book.data.price;
                    newPurchases.push({
                        isbn:item.isbn,
                        quantity:item.quantity,
                        price
                    })
                }
                await updateUserPurchases(userData.token,newPurchases);
                cartDispatch(setCart([]));
            }catch(err){
                setError(true)
            }
        }
        sessionStorage.removeItem('cart');
    }


    
    return(
        
        <div className={props.total?"total-box":"total-box disable"}>
            <h3>Total Price: <span>{changeNumberDisplayFormat(props.total)}</span>$</h3>
            <button onClick={onClickCheckout}>CHECKOUT</button>
            {error&&<h6>Something went wrong, please try again later</h6>}
        </div>
    
    )
}


export default CartTotalBox;