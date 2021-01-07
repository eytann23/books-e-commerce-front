import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {getBooksFromDB} from '../../server/db';
import SearchDropdown from './SearchDropdown';


const SearchBar = (props) => {

    const [booksToDisplay,setBooksToDisplay]=useState([]);
    const [isSearchInputOnFocus,setIsSearchInputOnFocus] = useState(false);
    const [inputValue,setInputValue] = useState("");

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

    const history=useHistory();

    const onSubmitSearch = (e)=>{
        e.preventDefault();
        const searchInput=(inputValue.trim()).toLowerCase();
        if(searchInput.length>0)
            history.push(`/search/${searchInput}`)
        setInputValue("");  
    }

    const onInputSearch = (event) => {
        setInputValue(event.target.value);
        if ((event.target.value.trim()).length>=2)
            searchBooks((event.target.value.trim()).toLowerCase());
        else{
            setBooksToDisplay([]);
        }
    };
    const onBlurSearchInput=()=>{
        setTimeout(() => {
            console.log("close dropdown")
            setIsSearchInputOnFocus(false)
        }, 150)
    }

    const isSearchDropdownDisplay=()=>{
        return (inputValue && booksToDisplay.length>0 && isSearchInputOnFocus)
    }

	return(
		<div className="search">
            <form onSubmit={onSubmitSearch}>
                <input type="text" placeholder="Search"
                    value={inputValue}
                    onInput={onInputSearch}
                    onSubmit={onSubmitSearch}
                    onBlur={onBlurSearchInput}
                    onFocus={()=>setIsSearchInputOnFocus(true)}
                />
                <button type="submit"/>
            </form>

            {isSearchDropdownDisplay() &&
             <SearchDropdown 
                booksToDisplay={booksToDisplay}
                setInputValue={setInputValue}
                setBooksToDisplay={setBooksToDisplay}
            />}
			
		</div>
	)
	
};

export default SearchBar;