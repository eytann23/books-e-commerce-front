import React from 'react';
import { useHistory } from 'react-router-dom';

const BackToShopButton = () => {
    const history=useHistory();
    const onClickBack=()=>{
        history.push("/");
    }
    return (
        <div className="back-to-shop__button" onClick={onClickBack}>
            <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
            <h2>Back to Shop</h2>
        </div>
    );
};

export default BackToShopButton;