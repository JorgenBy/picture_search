import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Stack  from 'react-bootstrap/Stack';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';

class App extends Component {
    state = { images: [], term: 'Labrador', imagesFound: true, pageNum: 1, totalPages: 0, totalitems: 0};

    onSearchSubmit = async (term) => {
        const response = await unsplash.get('/search/photos', {
            params: { query: term}
        });

        console.log(response);

        this.setState({
            term: term,
            pageNum: 1, 
            images: response.data.results, 
            imagesFound: true, 
            totalPages: response.data.total_pages,
            totalitems: response.data.total });
        if (response.data.results.length === 0) {
            this.setState({imagesFound: false});
        }
    }

    onPageChange = async (pageNum) => {
        console.log(pageNum);
        console.log(this.state.term)
        const response = await unsplash.get('/search/photos', {
            params: { query: this.state.term, page: pageNum}
        });

        console.log(response);

        this.setState({
            ...this.state,
            pageNum: pageNum,
            images: response.data.results, 
            imagesFound: true, 
            totalPages: response.data.total_pages,
            totalitems: response.data.total });
        if (response.data.results.length === 0) {
            this.setState({imagesFound: false});
        }
    }

    render() {
        return (
            <Container>
                <Stack gap={3}>
                    <SearchBar 
                        onSubmit={this.onSearchSubmit} />
                    <ImageList 
                        images={this.state.images} 
                        renderResults={this.state.imagesFound} 
                        page={this.state.pageNum} 
                        totalPages={this.state.totalPages}
                        total={this.state.totalitems}
                        pageNum={this.state.pageNum}
                        onPageChange={this.onPageChange}
                    />
                </Stack>
            </Container>
        );
    }
}

export default App;