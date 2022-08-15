import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

const ProductModal = (product) => {
  const {
    product: { _id },
    product: { name },
    product: { description },
    product: { image },
    product: { price },
    product: { stock },
    product: { ingredients },
  } = product;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const images = image;

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          className="pointer"
          variant="top"
          src={image[0]}
          alt={name}
          onClick={handleShow}
        />
        <Card.Body>
          <Card.Title
            onClick={handleShow}
            style={{ fontWeight: 700 }}
            className="text-center pointer mt"
          >
            {name}
          </Card.Title>
          {/* <Card.Text>{description}</Card.Text> */}
          <div className="d-flex justify-content-around">
            <Button
              className="btn-products"
              variant="primary"
              onClick={handleShow}
            >
              More Info
            </Button>
            <Button className="btn-products" variant="primary">
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="d-flex justify-content-between" closeButton>
          <Modal.Title className="text-center">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel variant="dark" interval={null}>
            {images.map((image) => (
              <Carousel.Item>
                <img src={image} className="d-block w-100" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="p-2">{description}</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="dark"
            className="btn-products"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="dark"
            className="btn-products"
            onClick={() => {
              handleClose();
            }}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
