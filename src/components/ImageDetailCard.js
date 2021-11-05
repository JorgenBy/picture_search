import React from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton'

const ImageDetailCard = ({image, onCloseImage}) => {
    if (!image) {
        return null;
    }
    console.log(image);
    const {description, urls} = image;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>
                <CloseButton aria-label="Hide" onClick={onCloseImage}/>
            </Card.Header>
            <Card.Img variant="top" src={urls.small} />
            <Card.Body>
            <Card.Text>
                {description}
            </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ImageDetailCard;