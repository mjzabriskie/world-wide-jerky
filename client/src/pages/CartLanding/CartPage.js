import { loadStripe } from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from "react";
import { ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from "../../utils/helpers";
import CartPageItem from '../../components/CartPageItem/index';
import Auth from '../../utils/auth';
import './index.css';
import { useStoreContext } from '../../utils/GlobalState';
import { useLazyQuery } from '@apollo/client';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


function CartPage(item) {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
        
        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds}
        });
    }

    return (
        <div className="card mt-2 mb-2" id="card">
            <div className="row m-0">
                <div className="col-md-8 cart-2">
                    <div className="title">
                        <div className="row m-0">
                            <div className="col">
                                <h3>Shopping Cart</h3>
                            </div>
                            <div className="col align-self-center text-end text-muted"> 2 items</div>
                        </div>
                    </div>
                    {state.cart.length ? (
                        <div>
                            {state.cart.map(item => (
                                <CartPageItem key={item._id} item={item} />
                            ))}
                        </div>

                    ) : (
                        <h3>
                            <span role="img" aria-label="shocked">
                                😱
                            </span>
                            You haven't added anything to your cart yet!
                        </h3>
                    )}
                </div>
                <div className="col-md-4 summary">
                    <div><h5 className="summary-header"><b>Summary</b></h5></div>
                    <hr/>
                    <div className="row m-0">
                        <div className="col" style={{ paddingLeft: "0px" }}>ITEMS 3</div>
                        <div className="col text-right">&#36; 132.00</div>
                    </div>
                    <form className="cart-form">
                        <p>SHIPPING</p>
                        <select className="shipping"><option className="text-muted">Standard-Delivery- &#36;5.00</option></select>
                        <p>GIVE CODE</p>
                        <input className="codeInput" id="code" placeholder="Enter your code" />
                    </form>
                    <div className="row m-0" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&#36; {calculateTotal()}</div>
                    </div>
                    {
                        Auth.loggedIn() ?
                            <button className="checkoutbtn" onClick={submitCheckout}>
                                CHECKOUT
                            </button>
                            :
                            <span>(log in to check out)</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartPage