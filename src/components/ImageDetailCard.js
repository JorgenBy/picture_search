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
        <Card>
            <Card.Body>
                <CloseButton aria-label="Hide" onClick={onCloseImage}/>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" className="cardimage" src={urls.full} />
        </Card>
    );
}

export default ImageDetailCard;