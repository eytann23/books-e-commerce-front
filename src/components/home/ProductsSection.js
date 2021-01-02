import React, { useEffect, useState } from 'react';
import ProductPreview from './ProductPreview';
import {getBooksFromDB} from '../../server/db';

const ProductsSection =()=>{
    const [booksState,setBooksState]=useState([]);
    
    useEffect(()=>{
        getBooksFromDB()
            .then((books)=>setBooksState(books))
    },[])
    
    return(
            <div className="products-section">
            {booksState.map((book,index)=>{
                return (
                    //need to change the key after connecting to a real db
                    <ProductPreview
                        key={index}
                        id={book.id}
                        name={book.name}
                        author={book.author}
                        price={book.price}
                        img={book.img}
                    />
                )
            })}
            </div>
    )
}

export default ProductsSection;