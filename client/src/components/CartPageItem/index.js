import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


const CartPageItem = ({ product }) => {
    const [, dispatch] = useStoreContext();

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
    };

    const removeFromCart = product => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: product._id
        });
        idbPromise('cart', 'delete', { ...product });
    };
    return (
        <div className="row border-top border-bottom m-0">
            <div className="row main align-items-center m-0">
                <div className="col-2 pad"><img className="img-fluid cart-image" src={product.image[0]} alt="" /></div>
                <div className="col pad">
                    <div className="row text-muted m-0">{product.name}</div>
                </div>
                <div className="col pad">
                    <input
                        className='rounded text-center'
                        type="number"
                        placeholder="1"
                        value={product.purchaseQuantity}
                        onChange={onChange}
                    />
                </div>
                <div className="col pad">&#36; {product.price / 100} <span className="close pointer" onClick={() => removeFromCart(product)}>&#10005;</span></div>
            </div>
        </div>
    )
}

export default CartPageItem