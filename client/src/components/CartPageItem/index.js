import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


const CartPageItem = ({ item }) => {
    const [, dispatch] = useStoreContext();

    const onChange = (e) => {
        const value = e.target.value;

        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });

            idbPromise('cart', 'delete', { ...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });

            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    };

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });
    };
    return (
        <div className="row border-top border-bottom m-0">
            <div className="row main align-items-center m-0">
                <div className="col-2 pad"><img className="img-fluid cart-image" src={`/images/${item.image}`} alt="" /></div>
                <div className="col pad">
                    <div className="row text-muted m-0">{item.name}</div>
                    <div className="row m-0">Cotton T-shirt</div>
                </div>
                <div className="col pad">
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    />
                </div>
                <div className="col pad">&#36; {item.price} <span className="close" onClick={() => removeFromCart(item)}>&#10005;</span></div>
            </div>
        </div>
    )
}

export default CartPageItem