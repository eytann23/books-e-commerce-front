import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddToCartAlert = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let isAlive=true;
        setVisible(props.visible);
        setTimeout(() => {
            if(isAlive){
                setVisible(false);
                props.setIsAlertVisible(false)
            }
          
        }, 7000);

        return ()=>{isAlive=false}
    }, [props.visible]);

    const history=useHistory();
    const onClickViewCart=(e)=>{
        e.stopPropagation()
        history.push("/cart");
    }

    return (
        visible?
        <div className="cart-alert__container">
            
            <div className="message">
            <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd"><path d="M13.5 18c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-3.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm13.257-14.5h-1.929l-3.473 12h-13.239l-4.616-11h2.169l3.776 9h10.428l3.432-12h4.195l-.743 2zm-13.537 4.183l-2.325-2.183-1.395 1.435 3.746 3.565 6.559-6.592-1.422-1.408-5.163 5.183z"/></svg>
                This book was successfully added!
            </div>
            <button onClick={onClickViewCart}>View Cart</button>
        </div>
        :
        <div/>
    );
};

export default AddToCartAlert;