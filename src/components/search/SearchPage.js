import React, { useEffect, useState } from 'react';
import { getBooksFromDB } from '../../server/db';
import Loader from '../main/Loader';
import ProductsSection from '../shared/ProductsSection';


const SearchPage = (props)=>{
    const searchValue = props.match.params.value;
    const [booksToDisplay,setBooksToDisplay]=useState([]);
    const [error,setError]=useState(false);
    const [waitingForApi,setWaitingForApi]=useState(true);

    const searchBooks=(searchValue)=>{
        getBooksFromDB()
            .then((books)=>{
                setBooksToDisplay(
                    books.filter((book)=>(
                        ((book.author.toLowerCase()).includes(searchValue) ||
                        (book.name.toLowerCase()).includes(searchValue) ||
                        (book.isbn===parseInt(searchValue)))
                    ))
                )
                
            })
            .then(()=>setWaitingForApi(false))
            .catch((error)=>setError(true))
    }

    useEffect(()=>{
        // let isMounted = true;
        setWaitingForApi(true)
        setBooksToDisplay([])
        searchBooks(searchValue)

        // return () => { isMounted = false };
    },[props.match.params.value])

    return(
        (waitingForApi&&<Loader/>)||
        <div className="page search-page">
            <h2>Results for "{searchValue}":</h2>
            {booksToDisplay.length>0 ? 
            <ProductsSection booksToDisplay={booksToDisplay}/> :
            <h4>No results found...</h4>}
        </div>
    )
}

export default SearchPage;