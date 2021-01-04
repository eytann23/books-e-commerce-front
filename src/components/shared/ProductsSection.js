import React from 'react';
import ProductPreview from './ProductPreview';

const ProductsSection =(props)=>{


    return(
            
            <div className="products-section">
            {props.booksToDisplay.map((book,index)=>{
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