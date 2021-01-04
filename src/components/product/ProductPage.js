import React, { useContext, useEffect, useState } from 'react';
import { addToCart } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import {getBookByISBN} from '../../server/db';

//need to get book details out of db by id
const ProductPage =(props)=>{
    const productISBN=props.match.params.isbn;

    const {cartState,cartDispatch} = useContext(CartContext);
    const [bookState,setBookState]=useState([]);
    
    useEffect(()=>{
        getBookByISBN(productISBN)
            .then((book)=>setBookState(book.data))
    },[props.match.params])

    


    const onSubmitAddToCart=(e)=>{
        e.preventDefault();
        
        cartDispatch(addToCart(productISBN));
        
        console.log('Added');
        
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