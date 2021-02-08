import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { deleteBookByISBN } from '../../server/db';

Modal.setAppElement('#root');
const RemoveModal = (props) => {
  

    const onClickRemove= async () =>{
        await deleteBookByISBN(props.isbn);
        props.setIsOpen(false);
        window.location.reload();
    }
    const closeModal=()=>{
        props.setIsOpen(false);
        props.setIsHover(false);
    }

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h1>Are you sure?</h1>
                <h4>This book will be removed immediately.</h4>
                <button onClick={closeModal}>Cancel</button>
                <button className="red" onClick={onClickRemove}>Remove</button>
            </Modal>
        </div>
    );
};

export default RemoveModal;