import React, { useContext, useEffect, useState } from 'react';
import { addToCart } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import {getBookByISBN} from '../../server/db';
import AddToCartAlert from '../cart/AddToCartAlert';
import BackToShopButton from '../shared/BackToShopButton';
import InputNumber from '../shared/InputNumber';

//need to get book details out of db by id
const ProductPage =(props)=>{
    const productISBN=props.match.params.isbn;

    const {cartState,cartDispatch} = useContext(CartContext);
    const [bookState,setBookState]=useState([]);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [itemQuantity,setItemQuantity] = useState(1);

    useEffect(()=>{
        getBookByISBN(productISBN)
            .then((book)=>setBookState(book.data))
    },[props.match.params])




    const onSubmitAddToCart=(e)=>{
        e.preventDefault();
        console.log(itemQuantity)
        cartDispatch(addToCart(productISBN,itemQuantity));
        
        console.log('Added');
        setIsAlertVisible(false);
        setTimeout(()=>{
            setIsAlertVisible(true);
        },20)
        
    }

    return(
        <div className="page">
            <AddToCartAlert visible={isAlertVisible} setIsAlertVisible={setIsAlertVisible}/>
            <div className="product-row">
                <img src={bookState.img} alt=""></img>
                
                <div className="product-details">
                    <h1>{bookState.name}</h1>
                    <h3>{bookState.author}</h3>
                    <h4>{bookState.description}</h4>
                </div>
                <form className="add-to-cart__form" onSubmit={onSubmitAddToCart}>
                    <h2 className="add-to-cart__detail">Price: <span className="price">{bookState.price}$</span></h2>
                    
                    <h2 className="add-to-cart__detail">
                        Quantity:
                        <span>
                            <InputNumber initValue={itemQuantity} setItemQuantity={setItemQuantity}/>
                        </span>
                    </h2>
                    <button type="submit">
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.975 8l.025-.5c0-.517-.067-1.018-.181-1.5h5.993l-.564 2h-5.273zm-2.475 10c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-10.428l-.455-1.083c-.323.049-.653.083-.99.083-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-4.5-10.5c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>
                        Add To Cart
                    </button>
                </form>
                
                
                
            </div>
            <BackToShopButton/>
        </div>
    )
}

export default ProductPage;