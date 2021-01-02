//Next step = Axios from firebase
import Axios from 'axios';

// const books=[
//     {
//         id:1,
//         name:"Book One",
//         author:"Author Something",
//         price:"5.79",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:2,
//         name:"Title of a book",
//         author:"Timmy",
//         price:"7.29",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:3,
//         name:"Book Book",
//         author:"Author Author",
//         price:"99.99",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:4,
//         name:"This is title",
//         author:"This is author",
//         price:"15.74",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:5,
//         name:"Title",
//         author:"Author",
//         price:"5.79",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:6,
//         name:"Book One",
//         author:"Author Something",
//         price:"5.79",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:7,
//         name:"Title of a book",
//         author:"Timmy",
//         price:"7.29",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:8,
//         name:"Book Book",
//         author:"Author Author",
//         price:"99.99",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:9,
//         name:"This is title",
//         author:"This is author",
//         price:"15.74",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     },
//     {
//         id:10,
//         name:"Title",
//         author:"Author",
//         price:"5.79",
//         img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
//     }
// ]


const DB_URL = process.env.REACT_APP_DB

// export const getBooksFromDB = ()=>{
//     return books;
// }



export const getBookById = async (id)=>{
    const books = await getBooksFromDB();
    for (let book of books){
        if (book.id===parseInt(id))
            return book;
    }
    return null;
}

//real-time db

export const getBooksFromDB = async ()=>{
    try{
        const res=await Axios.get(DB_URL+"books.json");
        const books=[];
        for (let id in res.data){
            books.push({
                id: res.data[id].id,
                name: res.data[id].name,
                author:res.data[id].author,
                price:res.data[id].price,
                img:res.data[id].img
            })
        }
        
        return books;

    }catch(e){
        console.log(e);
    }
}

export const postBookInDB=async (bookObj)=>{
    try {
        const res=await Axios.post(
            DB_URL+"books.json",
            bookObj);
        return res.data.bookObj;
    } catch (error) {
        console.log(error);
    }
}