import React from 'react';
import './ImageList.css';
import ImageCard from './ImageCard';
import ListPagination from './ListPagination';


const ImageList = ({ images, renderResults, totalPages, total, pageNum, onPageChange }) => {

    const onPageClick = (pageNum) => {
        onPageChange(pageNum);
    };

    if (!renderResults) {
        return <div>No pictures found</div>;
    }

    const renderedImages = images.map((image) => {
        return <ImageCard key={image.id} image={image}/>
    });

    return (
        <React.Fragment>
            <ListPagination totPages={totalPages} currentPage={pageNum} pageClicked={(ele) => {onPageClick(ele)}} />
            <div className="image-list">{renderedImages}</div>
        </React.Fragment>
    );
};

export default ImageList;