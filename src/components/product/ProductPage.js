import React, { useContext, useEffect, useState } from 'react';
import { addToCart } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import {getBookById} from '../../server/db';

//need to get book details out of db by id
const ProductPage =(props)=>{
    const productId=props.match.params.id;

    const {cartState,cartDispatch} = useContext(CartContext);
    const [bookState,setBookState]=useState([]);
    
    useEffect(()=>{
        getBookById(productId)
            .then((books)=>setBookState(books))
    },[])

    


    const onSubmitAddToCart=(e)=>{
        e.preventDefault();
        
        cartDispatch(addToCart(productId));
        
        console.log('Added');
        // console.log(cartState[0]);
    }

    return(
        <div className="page">
            <div className="product-row">
                <img src={bookState.img} alt=""></img>
                
                <div className="product-details">
                    <h1>{bookState.name}</h1>
                    <h3>{bookState.author}</h3>
                </div>
                
                <form onSubmit={onSubmitAddToCart}>
                    <h2>Price: <span>{bookState.price}$</span></h2>
                    <button type="submit">Add To Cart</button>
                </form>
                
            </div>
            
        </div>
    )
}

export default ProductPage;