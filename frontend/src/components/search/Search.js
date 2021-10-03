import React from 'react';
import './Search.css';

const Search = (props) => {
    const searchNews = props.searchNews;
    let kw = '';

    const search = (e) => {
        e.preventDefault();
        searchNews(kw);
    }

    const handleChange = (e) => {
        e.preventDefault();
        kw = e.target.value;
    }

    return (
        <div className="search" id="search">
            <form onSubmit={(e) => search(e)} class="myRow pt-2">
                <input onChange={(e) => handleChange(e)} className="u-full-width" type="text" placeholder="Search..." id="searchInput" />
            </form>
        </div>
    )
}

export default Search;