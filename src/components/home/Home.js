import React, { useEffect, useState } from 'react';
import ProductsSection from '../shared/ProductsSection';
import {getBooksFromDB} from '../../server/db';
import Loader from '../main/Loader';

const Home = ()=>{
    const [booksState,setBooksState]=useState([]);
    const [error,setError]=useState(false);
    useEffect(()=>{
        getBooksFromDB()
            .then((books)=>setBooksState(books))
            .catch((error)=>setError(true))
    },[])
    

    return(
        ((booksState.length===0)&&(!error)&&<Loader/>)||
            <div className="home page">
                {error?
                    <h2>Something went wrong, please try again later.</h2>
                    :
                    <>
                        <h2>Welcome To Logo</h2>
                        <h3 className="category__title">Best sellers</h3>
                        <ProductsSection booksToDisplay={booksState}/>
                    </>
                }
            </div>    
    )
}

export default Home;