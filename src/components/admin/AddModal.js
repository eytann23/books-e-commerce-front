import React, { useState } from 'react';

import Modal from 'react-modal';
import { addNewBookToDB } from '../../server/db';

Modal.setAppElement('#root');
const AddModal = (props) => {
    const initBookDetails={
        isbn:"",
        name: "",
        author: "",
        description: "",
        price: 0,
        cover: "",
        img:""
    }
    const [bookDetails,setBookDetails]=useState(initBookDetails);
    const [errorISBN,setErrorISBN]=useState(" ");


    const onClickSave= async (e) =>{
        e.preventDefault();
        try{
            await addNewBookToDB({
                isbn: bookDetails.isbn,
                name: bookDetails.name,
                author: bookDetails.author,
                description: bookDetails.description,
                price: bookDetails.price,
                cover: bookDetails.cover
            })
            props.setIsOpen(false);
            window.location.reload();
        }catch(error){
            console.log(error.response)
            if (error.response && error.response.data.keyValue.isbn)
                setErrorISBN("This ISBN already exists")
        }
        
        
    }

    const closeModal=()=>{
        props.setIsOpen(false);
        setBookDetails(initBookDetails);
        
    }
    const onChangeISBN=(e)=>{
        setBookDetails({
            ...bookDetails,
            isbn: e.target.value
        })
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
                <h1>Add Book</h1>
                <div className='form__container'>
                    <form onSubmit={onClickSave}>
                        <label>ISBN:</label>
                        <input type="text" value={bookDetails.isbn} onChange={onChangeISBN}/>
                        <h6 className="error">{errorISBN}</h6>
                        <label>Title:</label>
                        <input type="text" value={bookDetails.name} onChange={onChangeTitle}/>
                        <label>Author:</label>
                        <input type="text" value={bookDetails.author} onChange={onChangeAuthor}/>
                        <label>Description:</label>
                        <textarea rows="4" value={bookDetails.description} onChange={onChangeDescription}></textarea>
                        <label>Price:</label>
                        <input type="text" value={bookDetails.price} onChange={onChangePrice}/>                  
                        <button type="submit" className="green">Save</button>
                        <button onClick={closeModal} type="button">Cancel</button>
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

export default AddModal;