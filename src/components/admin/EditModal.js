import React, { useState } from 'react';

import Modal from 'react-modal';
import { editBookByISBN } from '../../server/db';

Modal.setAppElement('#root');
const EditModal = (props) => {
    const [bookDetails,setBookDetails]=useState(props.book);

    const onClickSave= async (e) =>{
        e.preventDefault();
        await editBookByISBN(
            bookDetails.isbn,
            {
                name: bookDetails.name,
                author: bookDetails.author,
                description: bookDetails.description,
                price: bookDetails.price,
                ...(bookDetails.cover && {cover: bookDetails.cover})
            }
        );
        props.setIsOpen(false);
        window.location.reload();
    }

    const closeModal=()=>{
        props.setIsOpen(false);
        props.setIsHover(false);
    }

    const onChangeTitle=(e)=>{
        setBookDetails({
            ...bookDetails,
            name: e.target.value
        })
    }
    const onChangePrice=(e)=>{
        setBookDetails({
            ...bookDetails,
            price: e.target.value
        })
    }
    const onChangeAuthor=(e)=>{
        setBookDetails({
            ...bookDetails,
            author: e.target.value
        })
    }
    const onChangeDescription=(e)=>{
        setBookDetails({
            ...bookDetails,
            description: e.target.value
        })
    }
    const onChangeCover=(e)=>{
        setBookDetails({
            ...bookDetails,
            cover: e.target.files[0],
            img: URL.createObjectURL(e.target.files[0])
        })        
    }
    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={closeModal}
                className="Modal form-modal"
                overlayClassName="Overlay"
            >
                <h1>Edit Book</h1>
                <div className='form__container'>
                    <form onSubmit={onClickSave}>
                        <label>ISBN:</label>
                        <h4>{bookDetails.isbn}</h4>
                        <label>Title:</label>
                        <input type="text" value={bookDetails.name} onChange={onChangeTitle}/>
                        <label>Author:</label>
                        <input type="text" value={bookDetails.author} onChange={onChangeAuthor}/>
                        <label>Description:</label>
                        <textarea rows="4" value={bookDetails.description} onChange={onChangeDescription}></textarea>
                        <label>Price:</label>
                        <input type="text" value={bookDetails.price} onChange={onChangePrice}/>                  
                        <button type="submit" className="green">Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </form>
                    <div className="cover-img">
                            <img src={bookDetails.img} alt=""/>
                            <label htmlFor="file-upload" className="custom-file-upload">Change Cover</label>
                            <input id="file-upload" type="file" onChange={onChangeCover}/>
                    </div>
                </div>
                
                
            </Modal>
        </div>
    );
};

export default EditModal;