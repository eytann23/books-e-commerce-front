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
                <button type="submit">
                    <svg width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg>
                </button>
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