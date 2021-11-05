import React from 'react';
import ImageCard from './ImageCard';
import '../css/imagelist-style.css';

const ImageList = ({ images, renderResults, onImageSelect }) => {
    if (!renderResults) {
        return <div>No pictures found</div>;
    }

    const renderedImages = images.map((image) => {
        return <ImageCard key={image.id} image={image} onImageSelect={onImageSelect}/>
    });

    return (
        <React.Fragment>
            <div className="image-list">{renderedImages}</div>
        </React.Fragment>
    );
};

export default ImageList;