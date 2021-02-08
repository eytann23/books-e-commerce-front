import React, { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { CartContext } from '../../context/cartContext';
import { UserContext } from '../../context/userContext';
import AddToCartAlert from '../cart/AddToCartAlert';
import ProductPreviewOverlay from './ProductPreviewOverlay';

const ProductPreview =(props)=>{
    const {cartDispatch} = useContext(CartContext);
    const {userData} = useContext(UserContext);
    //temp
    // const userData={isAdmin:true}

    const [isHover,setIsHover]=useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);


    let history=useHistory()
    const onClickProduct=(e)=>{
        if(!(isHover&&userData.isAdmin))
            history.push(`/product/${props.isbn}`)
    }

    const onClickAddToCart=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        cartDispatch(addToCart(props.isbn));
        console.log('Added');
        setIsAlertVisible(true);
        setIsHover(false); 
    }

    const onMouseEnter=()=>{
        if (!isAlertVisible)
            setIsHover(true); 
    }

   

    return(
    <div className="product-preview" 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={()=>setIsHover(false)}
        onClick={onClickProduct}>

        <AddToCartAlert visible={isAlertVisible} setIsAlertVisible={setIsAlertVisible}/>
        
        {(isHover && userData && userData.isAdmin)?
            <ProductPreviewOverlay isbn={props.isbn} bookDetails={props} setIsHover={setIsHover} onClickAddToCart={onClickAddToCart}/>
            :
            // (isHover && <button className="button__add-to-cart" onClick={onClickAddToCart}>Add To Cart</button>)
            isHover&&
            <div className="button__add-to-cart" onClick={onClickAddToCart}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.975 8l.025-.5c0-.517-.067-1.018-.181-1.5h5.993l-.564 2h-5.273zm-2.475 10c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-10.428l-.455-1.083c-.323.049-.653.083-.99.083-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-4.5-10.5c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>
            </div>
            
        }

        <img src={props.img} alt=""/>
        <div className="product-details">
            <h4>{props.name}</h4>
            <h3>{props.author}</h3>
            <h5>{props.price}$</h5>
        </div>
    </div>
    )
}

export default ProductPreview;