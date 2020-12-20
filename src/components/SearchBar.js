import React, { Component } from 'react';

class SearchBar extends Component {
    state = {term: ''};

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Sök Bilder</label>
                        <input 
                            type="text" 
                            value={this.state.term} 
                            onChange={(e) => this.setState({term: e.target.value})} />
                        <button className="ui button">Search</button>
                    </div>  
                </form>
            </div>
        );
    }
}

export default SearchBar;