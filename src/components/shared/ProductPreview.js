import React from 'react';
import {useHistory} from 'react-router-dom';

const ProductPreview =(props)=>{
    
    let history=useHistory()
    const onClickProduct=(e)=>{
        history.push(`/product/${props.isbn}`)
    }
    return(
        <div className="product-preview" onClick={onClickProduct}>
            <img src={props.img} alt=""/>
            <h4>{props.name}</h4>
            <h3>{props.author}</h3>
            <h5>{props.price}$</h5>
        </div>
    )
}

export default ProductPreview;