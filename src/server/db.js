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




// const DB_URL = process.env.REACT_APP_DB

//real-time db

// export const getBooksFromDB = async ()=>{
//     try{
//         const res=await Axios.get(DB_URL+"books.json");
//         const books=[];
//         for (let id in res.data){
//             books.push({
//                 id: res.data[id].id,
//                 name: res.data[id].name,
//                 author:res.data[id].author,
//                 price:res.data[id].price,
//                 img:res.data[id].img
//             })
//         }
        
//         return books;

//     }catch(e){
//         console.log(e);
//     }
// }

// export const postBookInDB=async (bookObj)=>{
//     try {
//         const res=await Axios.post(
//             DB_URL+"books.json",
//             bookObj);
//         return res.data.bookObj;
//     } catch (error) {
//         console.log(error);
//     }
// }