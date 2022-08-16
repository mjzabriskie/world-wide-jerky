import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const Cartproduct = ({ product }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = product => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: product._id
    });
    idbPromise('cart', 'delete', { ...product });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: product._id
      });
      idbPromise('cart', 'delete', { ...product });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: product._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...product, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="d-flex">
      <div>
        <img
          src={product.image[0]}
          alt=""
        />
      </div>
      <div>
        <div>{product.name}, ${(product.price / 100).toFixed(2)}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            className='rounded text-center w-25 mx-1'
            placeholder="1"
            value={product.purchaseQuantity}
            onChange={onChange}
          />
          <span
            className='pointer'
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(product)}
          >
            &#10005;
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cartproduct;