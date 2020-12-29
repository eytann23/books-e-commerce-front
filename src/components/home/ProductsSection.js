import React from 'react';
import ProductPreview from './ProductPreview';
import {getBooksFromDB} from '../../server/db';

const ProductsSection =()=>{
    const books = getBooksFromDB();
    
    
    return(
            <div className="products-section">
            {books.map((book,index)=>{
                return (
                    //need to change the key after connecting to a real db
                    <ProductPreview
                        key={index}
                        id={book._id}
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