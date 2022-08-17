import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY, TOGGLE_LOGIN } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Auth from '../../utils/auth';

const ProductModal = (product) => {
  const [state, dispatch] = useStoreContext();

  const {
    _id,
    name,
    description,
    image,
    price,
  } = product;

  const { cart } = state

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const images = image;

  function toggleLogin() {
    dispatch({ type: TOGGLE_LOGIN });
  }

  const addToCart = () => {
    if (!Auth.loggedIn()) {
      toggleLogin();
      return;
    }
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
      <Card className="m-4 shadow rounded" style={{ width: "18rem" }}>
        <Card.Img
          className="pointer rounded-top"
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
          <Card.Text className="text-center">${(price / 100).toFixed(2)}</Card.Text>
          <div className="d-flex flex-column">
            <Button
              className="btn btnFormReverse rounded w-100 my-1"
              onClick={handleShow}
            >
              MORE INFO
            </Button>
            <Button className="btn btnForm rounded w-100 my-1" onClick={addToCart}>
              ADD TO CART
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
                <img src={image} className="d-block w-100" alt={name} />
              </Carousel.Item>
            ))}
          </Carousel>
          <h5 className="text-start pt-2 fw-bold">${(price / 100).toFixed(2)}</h5>
          <p className="p-2">{description}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          <Button
            className="btn btnFormReverse rounded w-100 my-1"
            onClick={() => {
              handleClose();
            }}
          >
            CLOSE
          </Button>
          <Button
            className="btn btnForm rounded w-100 my-1"
            onClick={() => {
              addToCart();
            }}
          >
            ADD TO CART
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
