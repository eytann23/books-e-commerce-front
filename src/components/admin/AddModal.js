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
        price: "",
        cover: "",
        img:""
    }
    const [bookDetails,setBookDetails]=useState(initBookDetails);
    const [errorISBN,setErrorISBN]=useState(" ");
    const [errorCoverImage,setErrorCoverImage]=useState(" ");

    const isFormValid=()=>{
        for (let [key,value] of Object.entries(bookDetails)){
            if(!value)
                return false;
        }
        return true;
    }
    const markAllInvalidInputs=(e)=>{
        const formElementsArray=Array.from(e.target)
        formElementsArray.forEach(element => {
            if(element.type==="text" || element.type==="textarea")
                if (!element.value.trim()){
                    element.classList.add("red-border")
                }
        });
        if (!bookDetails.cover){
            setErrorCoverImage("Please choose a cover image");
        }
    }

    const onClickSave= async (e) =>{
        e.preventDefault();
        if (!isFormValid()){
            markAllInvalidInputs(e);
            return;
        }

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
            if (error.response && error.response?.data?.keyValue?.isbn)
                setErrorISBN("This ISBN already exists")
        }
        
        
    }

    const closeModal=()=>{
        props.setIsOpen(false);
        setBookDetails(initBookDetails);
    }

    const markEmptyInput=(e)=>{
        if(!!e.target.value)
            e.target.classList.remove('red-border')
        else
            e.target.classList.add('red-border')
    }
    const onChangeISBN=(e)=>{
        if(!isNaN(e.target.value)){
            setBookDetails({
                ...bookDetails,
                isbn: e.target.value
            })
        }
        markEmptyInput(e)
    }
    const onChangeTitle=(e)=>{
        setBookDetails({
            ...bookDetails,
            name: e.target.value
        })
        markEmptyInput(e)
    }
    const onChangePrice=(e)=>{
        if(!isNaN(e.target.value)){
            setBookDetails({
                ...bookDetails,
                price: e.target.value
            })
        }
        markEmptyInput(e)
        
    }
    const onChangeAuthor=(e)=>{
        setBookDetails({
            ...bookDetails,
            author: e.target.value
        })
        markEmptyInput(e)
    }
    const onChangeDescription=(e)=>{
        setBookDetails({
            ...bookDetails,
            description: e.target.value
        })
        markEmptyInput(e)
    }
    const onChangeCover=(e)=>{
        setBookDetails({
            ...bookDetails,
            cover: e.target.files[0],
            img: URL.createObjectURL(e.target.files[0])
        })
        setErrorCoverImage(" ")   
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
                            {!!bookDetails.img ?
                                <img src={bookDetails.img} alt=""/>
                                :
                                <div className="no-image__container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z"/></svg>
                                </div>
                            }
                            
                            <label htmlFor="file-upload" className="custom-file-upload">Change Cover</label>
                            <input id="file-upload" type="file" accept="image/*" onChange={onChangeCover}/>
                            <div className="error">{errorCoverImage}</div>
                    </div>
                </div>
                
                
            </Modal>
        </div>
    );
};

export default AddModal;