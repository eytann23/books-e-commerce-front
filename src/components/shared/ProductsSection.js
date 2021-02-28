import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import AddNewProduct from '../admin/AddNewProduct';
import ProductPreview from './ProductPreview';
import { useLocation } from 'react-router-dom';


const ProductsSection =(props)=>{
    const {userData} = useContext(UserContext);
    //temp
    // const userData={isAdmin:true}
    
    const location=useLocation();
    
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
                        description={book.description}
                        price={book.price}
                        img={book.img}
                    />
                )
            })}
            
            {location.pathname==="/home" && userData.user && userData.user.isAdmin && <AddNewProduct />}
            
            </div>
    )
}

export default ProductsSection;