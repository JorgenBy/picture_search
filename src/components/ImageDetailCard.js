import React from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

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
            <Card.Body>
                <Card.Text>
                    {description}

                </Card.Text>
                <Card.Text>
                    <a href={urls.full} download="pic">
                        <i 
                            src="../assets/download.svg" 
                            className="bi-download"
                            onClick={onImageDownload}
                        >  
                        </i>
                    </a>
                </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" className="cardimage" src={urls.full} />
        </Card>
    );
}

export default ImageDetailCard;