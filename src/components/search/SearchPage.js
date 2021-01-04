import React, { useEffect, useState } from 'react';
import { getBooksFromDB } from '../../server/db';
import ProductsSection from '../shared/ProductsSection';


const SearchPage = (props)=>{
    const searchValue = props.match.params.value;
    const [booksToDisplay,setBooksToDisplay]=useState([]);

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
    }

    useEffect(()=>{
        setBooksToDisplay([])
        searchBooks(searchValue)
    },[props.match.params.value])

    return(
        <div className="page search-page">
            <h2>Results for "{searchValue}"</h2>
            
            {booksToDisplay.length>0 ? 
            <ProductsSection booksToDisplay={booksToDisplay}/> :
            <h4>No results found...</h4>}
        </div>
    )
}

export default SearchPage;