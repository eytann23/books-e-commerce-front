import React, { useEffect, useState } from 'react';
import { getBookByISBN } from '../../server/db';
import { changeNumberDisplayFormat } from '../../utils/changeNumberFormat';

const PurchasedItem = (props) => {
    const initialItemState ={
        details: {img:"/",name:"",author:"",price:""}
    }
    const [itemState,setItemState] = useState(initialItemState)
    
    useEffect(async()=>{
        const item=await getBookByISBN(props.isbn)
        setItemState({
            img:item.data.img,
            name:item.data.name,
            author:item.data.author,
            quantity:props.quantity,
            price:props.price,
            total:props.quantity*props.price,
            date:changeDateFormat(new Date(props.date))
        })
    },[props])

    function changeDateFormat(date){
        const year=date.getFullYear();
        const month=date.getMonth()+1;
        const day=date.getDate();
        const hour=date.getHours();
        const minute=date.getMinutes();
        return `${month}/${day}/${year} ${hour}:${minute}`
    }

    return (
        <div className="purchased-item">
            <img src={itemState.img} alt=""/>
            <div className="item-details">
                <p className="name__item">
                    <span>{itemState.name}</span>
                    (by {itemState.author})
                </p>
                <div className="item-info__container">
                    <p><span>Price</span>{itemState.price}$</p>
                    <p><span>Quantity</span>{itemState.quantity}</p>
                    <p className="total-price__item"><span>Total Price</span>{changeNumberDisplayFormat(itemState.total)}$</p>
                    <p><span>Purchased on</span>{itemState.date}</p>
                </div>
                
            </div>
            
        </div>
    );
};

export default PurchasedItem;