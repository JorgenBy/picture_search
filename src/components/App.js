import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';
import ImageDetailCard from './ImageDetailCard';
import ListPagination from './ListPagination';
import '../css/custom.css';

class App extends Component {
    state = { 
        images: [], 
        term: 'Labrador', 
        imagesFound: true, 
        pageNum: 1, 
        totalPages: 0, 
        totalitems: 0,
        hasSelectedImage: false,
        selectedImage: null };

    componentDidMount() {
        console.log("scrolling");
        window.scrollTo(0, 0)
    }

    onSearchSubmit = async (term) => {
        const response = await unsplash.get('/search/photos', {
            params: { query: term }
        });

        console.log(response);

        this.setState({
            term: term,
            pageNum: 1,
            images: response.data.results,
            imagesFound: true,
            totalPages: response.data.total_pages,
            totalitems: response.data.total
        });
        if (response.data.results.length === 0) {
            this.setState({ imagesFound: false });
        }
    }

    onPageChange = async (pageNum) => {
        const response = await unsplash.get('/search/photos', {
            params: { query: this.state.term, page: pageNum }
        });

        this.setState({
            ...this.state,
            pageNum: pageNum,
            images: response.data.results,
            imagesFound: true,
            totalPages: response.data.total_pages,
            totalitems: response.data.total
        });
        if (response.data.results.length === 0) {
            this.setState({ imagesFound: false });
        }
        window.scrollTo(0, 0);
    }

    onImageSelect = (image) => {
        this.setState({
            ...this.state,
            hasSelectedImage: true,
            selectedImage: image
        });
    }

    onCloseImage = () => {
        this.setState({
            ...this.state,
            hasSelectedImage: false,
            selectedImage: null
        })
    }

    renderSelectedImage = () => {
        if (this.state.hasSelectedImage) {
            return (
                <React.Fragment>
                <Col>
                    <Container className="position-sticky">
                        <ImageDetailCard image={this.state.selectedImage} onCloseImage={this.onCloseImage}/>
                    </Container>
                </Col>
                </React.Fragment>
            )
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Container fixed="realtive">
                <SearchBar onSubmit={this.onSearchSubmit} />
                    <Stack gap={3} className="mx-auto pt-2">
                        <Row>
                            {this.renderSelectedImage()}
                            <Col>
                                <ImageList
                                    images={this.state.images}
                                    renderResults={this.state.imagesFound}
                                    onImageSelect={this.onImageSelect}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ListPagination
                                    totPages={this.state.totalPages}
                                    currentPage={this.state.pageNum}
                                    pageClicked={(ele) => { this.onPageChange(ele) }}
                                />
                            </Col>
                        </Row>
                    </Stack>
            </Container>
        );
    }
}

export default App;