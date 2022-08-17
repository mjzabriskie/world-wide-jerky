import React from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import "./style.css";

const CarouselImage = ({ name, description, image }) => {
    return (
        <>
        <Link to="/productlist">
            <img className="d-block w-100" src={image[0]} alt={name} />
            </Link>
            <Carousel.Caption className="caption-background">
                <h3>{name}</h3>
            </Carousel.Caption>
        </>
    )
}

export default CarouselImage;