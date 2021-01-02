import React, { useContext,useEffect,useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { getBookById } from '../../server/db';
import CartItem from './CartItem';
import CartTotalBox from './CartTotalBox';

const CartPage =()=>{
    const {cartState} = useContext(CartContext);
    const [totalPriceState,setTotalPriceState] = useState(0);
    
    useEffect(()=>{
        updateTotalPrice();
    },[])

 

    const updateTotalPrice= async ()=>{
        let total=0;
        for (let item of cartState){
            let book = await getBookById(item.id);
            const price=parseFloat(book.price);
            const quantity=parseFloat(item.quantity);
            total+=price*quantity;
        }
        setTotalPriceState(total)
    }

    return(
        <div className="page">
            <h1>My Cart</h1>
            
            <div className="cart-items__section">
                <div className="cart-items__header">
                    <h3> </h3>
                    <h3>Name</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                    <h3> </h3>
                </div>
                {(cartState.length===0) && <div className="no-items__note">There are no items...</div>}
                {cartState.map((item)=>{
                    return(
                        <CartItem
                            key={item.id}
                            item={item}
                            updateTotalPrice={updateTotalPrice}
                        />
                    )
                })}

                <CartTotalBox total={totalPriceState}/>

            </div>
            
                

        </div>
    )
}

export default CartPage;