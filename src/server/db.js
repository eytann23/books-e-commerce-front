//Next step = Axios from firebase

const books=[
    {
        _id:1,
        name:"Book One",
        author:"Author Something",
        price:"5.79",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:2,
        name:"Title of a book",
        author:"Timmy",
        price:"7.29",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:3,
        name:"Book Book",
        author:"Author Author",
        price:"99.99",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:4,
        name:"This is title",
        author:"This is author",
        price:"15.74",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:5,
        name:"Title",
        author:"Author",
        price:"5.79",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:6,
        name:"Book One",
        author:"Author Something",
        price:"5.79",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:7,
        name:"Title of a book",
        author:"Timmy",
        price:"7.29",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:8,
        name:"Book Book",
        author:"Author Author",
        price:"99.99",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:9,
        name:"This is title",
        author:"This is author",
        price:"15.74",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
    {
        _id:10,
        name:"Title",
        author:"Author",
        price:"5.79",
        img:"https://images-na.ssl-images-amazon.com/images/I/41XgvthG9TL._SX331_BO1,204,203,200_.jpg"
    },
]

export const getBooksFromDB = ()=>{
    return books;
}

export const getBookById = (id)=>{
    for (let book of books){
        if (book._id===parseInt(id))
            return book;
    }
    return null;
}