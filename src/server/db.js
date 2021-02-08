//Next step = Axios from firebase

import Axios from 'axios';

//convert Uint8 to base64 and return string for img src usage
const convertUint8toBase64=(uint8Array)=>{
    let base64String = btoa(String.fromCharCode(...new Uint8Array(uint8Array)));
    return ("data:image/png;base64,"+base64String)
}

export const getBooksFromDB = async () =>{
    try {
        const books =await Axios.get('http://localhost:3001/books/get-all');
        if(!books)
            throw new Error (`Didn't find books`)
        
        for (let book of books.data){
            book.img=convertUint8toBase64(book.cover.data)
        }
        return books.data;
    
    } catch (error) {
        console.log(error);
    }


    const books =await Axios.get('http://localhost:3001/books/get-all');
    for (let book of books.data){
        book.img=convertUint8toBase64(book.cover.data)
    }
    return books.data;
}


export const getBookByISBN = async (isbn)=>{
    try {
        const book = await Axios.get(`http://localhost:3001/books/get?isbn=${isbn}`);
        if(!book)
            throw new Error (`Didn't find a book (ISBN: ${isbn})`)

        book.data.img=convertUint8toBase64(book.data.cover.data)
        return book;
    } catch (error) {
        console.log(error);
    }
    
}

export const addNewBookToDB = async (bookData)=>{
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let formdata = new FormData();
    for (const [key, value] of Object.entries(bookData)) {
        formdata.append(key,value);
    }
    try {
        const book = await Axios.post(
            `http://localhost:3001/books/add`,
            formdata,
            config
        );
        // console.log(err.response)
        return book;
    } catch (error) {
        // console.log(error.response)
        throw error;
    }
}

export const deleteBookByISBN = async (isbn)=>{
    try {
        const book = await Axios.delete(`http://localhost:3001/books/delete?isbn=${isbn}`);
        if(!book)
            throw new Error (`Didn't find a book (ISBN: ${isbn})`)

        return book.data;
    } catch (error) {
        console.log(error);
    }
}


export const editBookByISBN = async (isbn,data)=>{
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formdata.append(key,value);
    }

    try {
        const book = await Axios.patch(
            `http://localhost:3001/books/edit?isbn=${isbn}`,
            formdata,
            config
        );
        if(!book)
            throw new Error (`Didn't find a book (ISBN: ${isbn})`)

        return book.data;
    } catch (error) {
        console.log(error);
    }
}