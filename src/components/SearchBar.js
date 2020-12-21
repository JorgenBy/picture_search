import React, { useState } from 'react';

const SearchBar = ({onSubmit}) => {
    const [term, setTerm] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(term);
    };

    return (
        <div className="ui segment">
            <form className="ui form" onSubmit={onFormSubmit}>
                <div className="field">
                    <label>Search Pictures</label>
                    <input 
                        type="text" 
                        value={term} 
                        onChange={(e) => setTerm(e.target.value)} />
                    {/* <button className="ui button">Search</button> */}
                </div>  
            </form>
        </div>
    );
} 

export default SearchBar;