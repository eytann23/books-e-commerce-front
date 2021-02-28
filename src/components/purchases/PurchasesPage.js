import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';

import Loader from '../main/Loader';
import BackToShopButton from '../shared/BackToShopButton';
import PurchasedItem from './PurchasedItem';

const PurchasesPage = (props) => {
    const {userData}=useContext(UserContext);
    const [purchasesState,setPurchasesState]=useState(" ");

    useEffect(async()=>{
        setPurchasesState(userData.user.purchases)   
    },[props])

    return (
        (purchasesState===" " && <Loader/>)||
        <div className="page">
            <h1>Purchases History</h1>
            <div className="purchased-items__section">
                {(purchasesState.length===0) && <div className="no-items__note">There are no purchases...</div>}
                {purchasesState.map((item)=>
                    <PurchasedItem
                        key={nanoid()}
                        isbn={item.isbn}
                        quantity={item.quantity}
                        price={item.price}
                        date={item.date}
                    />
                )}
            </div>
            <BackToShopButton/>
        </div>
        
    );
};

export default PurchasesPage;