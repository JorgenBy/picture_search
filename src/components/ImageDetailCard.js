import React from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import '../css/custom.css';

const ImageDetailCard = ({image, onCloseImage, onImageDownload}) => {
    if (!image) {
        return null;
    }
    console.log(image);
    const {description, urls} = image;
    return (
        <Card>
            <Card.Header>
                <CloseButton aria-label="Hide" onClick={onCloseImage}/>
            </Card.Header>
            <Card.Img variant="top" src={urls.small} />
            <Card.Body>
            <Card.Text>
                {description}
            </Card.Text>
            <a href={urls.full} download="pic">
            <i 
                src="../assets/download.svg" 
                className="bi bi-download"
                onClick={onImageDownload}
                >  
            </i>
            </a>
            </Card.Body>
        </Card>
    );
}

export default ImageDetailCard;