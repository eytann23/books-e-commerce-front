import React, { useContext,useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { getBookByISBN } from '../../server/db';
import BackToShopButton from '../shared/BackToShopButton';
import CartItem from './CartItem';
import CartTotalBox from './CartTotalBox';

const CartPage =()=>{
    const {cartState} = useContext(CartContext);
    const [totalPriceState,setTotalPriceState] = useState(0);
    
    useEffect(()=>{
        updateTotalPrice();
    },[])

 
    
    const updateTotalPrice= async ()=>{
        try {
            let total=0;
            for (let item of cartState){
                let book = await getBookByISBN(item.isbn);
                const price=parseFloat(book.data.price);
                const quantity=parseFloat(item.quantity);
                total+=price*quantity;
        }
        setTotalPriceState(total)
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <div className="page">
            <h1>Shopping Cart</h1>
            
            <div className="cart-items__section">
                <div className="cart-items__header">
                    <h3>Item</h3>
                    <h3>Name</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                    <h3>Total</h3>
                    <h3> </h3>
                </div>
                {(cartState.length===0) && <div className="no-items__note">There are no items...</div>}
                {cartState.map((item)=>{
                    return(
                        <CartItem
                            key={item.isbn}
                            item={item}
                            updateTotalPrice={updateTotalPrice}
                        />
                    )
                })}
                
                <BackToShopButton/>
                <CartTotalBox total={totalPriceState}/>

            </div>
            
                

        </div>
    )
}

export default CartPage;