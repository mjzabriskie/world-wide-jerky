import React from "react";
import Carousel from 'react-bootstrap/Carousel';

const CarouselImage = ({ name, description, image }) => {
    return (
        <>
            <img className="d-block w-100" src={image[0]} alt={name} />
            <Carousel.Caption>
                <h3>{name}</h3>
                <p>{description}</p>
            </Carousel.Caption>
        </>
    )
}

export default CarouselImage;