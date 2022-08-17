import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import unsplash from './api/unsplash';
import ImageDetailCard from './components/ImageDetailCard';
import ListPagination from './components/ListPagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/custom.css';

class App extends Component {
  state = {
    images: [],
    term: '',
    imagesFound: true,
    pageNum: 1,
    totalPages: 0,
    totalitems: 0,
    hasSelectedImage: false,
    selectedImage: null,
  };

  componentDidMount() {
    this.getRandomPhotosOnLoad();
  }

  getRandomPhotosOnLoad = async () => {
    const response = await unsplash.get('/photos/random', {
      params: { count: 10 },
    });

    console.log(response);

    this.setState({
      ...this.state,
      pageNum: 1,
      images: response.data,
      imagesFound: true,
    });
    if (response.data.length === 0) {
      this.setState({ imagesFound: false });
    }
  };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term },
    });

    this.setState({
      term: term,
      pageNum: 1,
      images: response.data.results,
      imagesFound: true,
      totalPages: response.data.total_pages,
      totalitems: response.data.total,
      hasSelectedImage: false,
      selectedImage: null,
    });
    if (response.data.results.length === 0) {
      this.setState({ imagesFound: false });
    }
  };

  onPageChange = async (pageNum) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: this.state.term, page: pageNum },
    });

    this.setState({
      ...this.state,
      pageNum: pageNum,
      images: response.data.results,
      imagesFound: true,
      totalPages: response.data.total_pages,
      totalitems: response.data.total,
      hasSelectedImage: false,
      selectedImage: null,
    });
    if (response.data.results.length === 0) {
      this.setState({ imagesFound: false });
    }
    window.scrollTo(0, 0);
  };

  onImageSelect = (image) => {
    this.setState({
      ...this.state,
      hasSelectedImage: true,
      selectedImage: image,
    });
    window.scrollTo(0, 0);
  };

  onCloseImage = () => {
    this.setState({
      ...this.state,
      hasSelectedImage: false,
      selectedImage: null,
    });
  };

  onImageDownload = () => {
    console.log('trigger download');
  };

  renderSelectedImage = () => {
    if (this.state.hasSelectedImage) {
      return (
        <React.Fragment>
          <Row>
            <Col sm={4}>
              <ImageDetailCard
                image={this.state.selectedImage}
                onCloseImage={this.onCloseImage}
                onImageDownload={this.onImageDownload}
              />
            </Col>
            <Col sm={8}>
              <ImageList
                images={this.state.images}
                renderResults={this.state.imagesFound}
                onImageSelect={this.onImageSelect}
              />
              <ListPagination
                totPages={this.state.totalPages}
                currentPage={this.state.pageNum}
                pageClicked={(ele) => {
                  this.onPageChange(ele);
                }}
              />
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ImageList
            images={this.state.images}
            renderResults={this.state.imagesFound}
            onImageSelect={this.onImageSelect}
          />
          <ListPagination
            totPages={this.state.totalPages}
            currentPage={this.state.pageNum}
            pageClicked={(ele) => {
              this.onPageChange(ele);
            }}
          />
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <Container fixed='realtive'>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <Stack gap={3} className='mx-auto pt-2'>
          {this.renderSelectedImage()}
        </Stack>
      </Container>
    );
  }
}

export default App;
