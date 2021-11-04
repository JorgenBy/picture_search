import React, { Component } from 'react';

class ImageCard extends Component {
    constructor (props) {
        super(props);

        this.state = { spans: 0 };

        this.imageRef = React.createRef();
        this.focusImage = this.focusImage.bind(this);
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;

        const spans = Math.ceil(height / 10 );  

        this.setState({spans});
    }

    focusImage() {
        console.log("focusing");
        this.imageRef.current.focus();
    }

    render() {

        const {description, urls} = this.props.image;
        return (
            <div style={{ gridRowEnd: `span ${this.state.spans}`}}>
               <img
               ref={this.imageRef} 
               alt={description}
               src={urls.regular}
               onClick={this.focusImage}
               /> 
            </div>
        );
    }
}

export default ImageCard;