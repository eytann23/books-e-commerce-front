import React, { useContext, useEffect, useState } from 'react';
import ProductPreview from './ProductPreview';
import {getBooksFromDB} from '../../server/db';

const ProductsSection =()=>{
    const [booksState,setBooksState]=useState([]);

    useEffect(()=>{
        try {
            getBooksFromDB()
                .then((books)=>setBooksState(books))
        } catch (error) {
            console.log(error)
        }
        
    },[])

    return(
            
            <div className="products-section">
                {/* <img src={testState} alt="" /> */}
            {booksState.map((book,index)=>{
                return (
                    //need to change the key after connecting to a real db
                    <ProductPreview
                        key={index}
                        isbn={book.isbn}
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