import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchDropdown=(props)=>{

    const history = useHistory();
    const onClickResult = (isbn)=>{
        history.push(`/product/${isbn}`)
        props.setInputValue("");
        props.setBooksToDisplay([])
    }
    
    return(
        <div className="search-dropdown">
            {props.booksToDisplay.map((book)=>(
                
                    <div key={book.isbn} className="result-row" onClick={()=>onClickResult(book.isbn)}>
                        <img src={book.img} alt=""></img>
                        
                        <div className="result-details">
                            <h1>{book.name}</h1>
                            <h3>{book.author}</h3>
                        </div>
                    </div>
                
            ))}
        </div>
    )
};


export default SearchDropdown;