import React, { useEffect } from "react";
import { idbPromise } from "../../utils/helpers"
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    };

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  };

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity / 100;
    });
    return sum.toFixed(2);
  };

  function submitCheckout() {
    window.location.assign('/cartpage');
  };

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" /></svg>
      </div>
    );
  }

  return (
    <div className="cart backPrimary rounded">
      <div className="close" onClick={toggleCart}>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(product => (
            <CartItem key={product._id} product={product} />
          ))}

          <div className="d-flex justify-content-between">
            <strong>Total: ${calculateTotal()}</strong>

            {
              Auth.loggedIn() ?
                <button className="btn btnForm rounded" onClick={submitCheckout}>
                  CHECKOUT
                </button>
                :
                <span>(Log in to check out)</span>
            }
          </div>
        </div>
      ) : (
        <h3>
          Your cart is currently empty.
        </h3>
      )}
    </div>
  );
};

export default Cart;
