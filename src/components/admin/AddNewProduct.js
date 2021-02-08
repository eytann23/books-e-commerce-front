import React, { useState } from 'react';
import AddModal from './AddModal';

function AddNewProduct(props) {
    const [addModalIsOpen,setAddModalIsOpen] = useState(false);


    const onClickAdd=(e)=>{
        setAddModalIsOpen(true);
    }
    return (
        <>
            <div className="product-preview add-new-product" onClick={onClickAdd}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                <h4 className="add-new-product__label">Add New Book</h4>
            </div>
            <AddModal modalIsOpen={addModalIsOpen} setIsOpen={setAddModalIsOpen}/>
        </>
    );
}

export default AddNewProduct;