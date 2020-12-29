import React from 'react';
import {getBookById} from '../../server/db';

//need to get book details out of db by id
const ProductPage =(props)=>{
    const productId=props.match.params.id;
    let book=getBookById(productId);

    const onSubmitAddToCart=(e)=>{
        e.preventDefault();
        alert(`The book was successfully added`)
    }

    return(
        <div className="page">
            <div className="product-row">
                <img src={book.img} alt=""></img>
                
                <div className="product-details">
                    <h1>{book.name}</h1>
                    <h3>{book.author}</h3>
                </div>
                
                <form onSubmit={onSubmitAddToCart}>
                    <h2>Price: <span>{book.price}$</span></h2>
                    <button type="submit">Add To Cart</button>
                </form>
                
            </div>
            
        </div>
    )
}

export default ProductPage;