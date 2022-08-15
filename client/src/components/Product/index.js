import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const ProductModal = (product) => {
  const [state, dispatch] = useStoreContext();

  const {
    _id,
    name,
    description,
    image,
    price,
    stock,
    ingredients,
  } = product;

  const { cart } = state

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const images = image;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...product, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...product, purchaseQuantity: 1 });
    }
  }

  return (
    <>
      <Card className="m-2 shadow" style={{ width: "18rem" }}>
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
            <Button className="btn-products" variant="primary" onClick={addToCart}>
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
            {images.map((image, index) => (
              <Carousel.Item key={index}>
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
