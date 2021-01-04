import React, { useEffect, useState } from 'react';
import ProductsSection from '../shared/ProductsSection';
import {getBooksFromDB} from '../../server/db';

const Home = ()=>{
    const [booksState,setBooksState]=useState([]);

    useEffect(()=>{
        try {
            getBooksFromDB()
                .then((books)=>setBooksState(books))
        } catch (error) {
            console.log(error)
        }
        
    },[])
    

    return(
        <div className="home">
            <h1>Welcome To My E-Commerce</h1>
            <ProductsSection booksToDisplay={booksState}/>
        </div>
    )
}

export default Home;