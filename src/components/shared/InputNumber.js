import React, { useEffect, useState } from 'react';

const InputNumber = (props) => {
    const [inputValue,setInputValue]=useState(props.initValue || 1);

    useEffect(()=>{
        props.setItemQuantity(inputValue)
        // console.log("Input: "+inputValue);
    },[inputValue])

    const handleIncrement=()=>{
        setInputValue(inputValue+1)
        
        
    }
    const handleDecrement=()=>{
        if(inputValue>1){
            setInputValue(inputValue-1)
        }
    }

    const onChangeInput=(e)=>{
        let value = e.target.value.replace(/[^0-9]/, '');
        value = (value === '' ? 1 : value);
        value = parseInt(value);
        setInputValue(value);
    }

    return (
        <div className="input-number">
            <span className={inputValue===1?"minus disable":"minus"} onClick={handleDecrement}>-</span>
            <input value={inputValue} onChange={onChangeInput}></input>
            <span className="plus" onClick={handleIncrement}>+</span>
        </div>
    );
};

export default InputNumber;