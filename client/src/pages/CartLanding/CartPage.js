import React from "react";
import './index.css'
function CartPage() {
    return (
        <div className="card mt-2 mb-2">
            <div className="row">
                <div className="col-md-8 cart-2">
                    <div className="title">
                        <div className="row">
                            <div className="col">
                                <h3>Shopping Cart</h3>
                            </div>
                            <div className="col align-self-center text-end text-muted"> 2 items</div>
                        </div>
                    </div>
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" alt="" /></div>
                            <div className="col">
                                <div className="row text-muted">Shirt</div>
                                <div className="row">Cotton T-shirt</div>
                            </div>
                            <div className="col">
                                <a href="/">-</a><a href="/" className="border">1</a><a href="/">+</a>
                            </div>
                            <div className="col">&#36; 44.00 <span className="close">&#10005;</span></div>
                        </div>
                    </div>
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" alt="" /></div>
                            <div className="col">
                                <div className="row text-muted">Shirt</div>
                                <div className="row">Cotton T-shirt</div>
                            </div>
                            <div className="col">
                                <a href="/">-</a><a href="/" className="border">1</a><a href="/">+</a>
                            </div>
                            <div className="col">&#36; 44.00 <span className="close">&#10005;</span></div>
                        </div>
                        <div className="back-to-shop"><a href="/">&#8592;</a><span className="text-muted">Back to shop</span></div>
                    </div>
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr />
                    <div className="row">
                        <div className="col" style={{ paddingLeft: "0px" }}>ITEMS 3</div>
                        <div className="col text-right">&#36; 132.00</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- &#36;5.00</option></select>
                        <p>GIVE CODE</p>
                        <input id="code" placeholder="Enter your code" />
                    </form>
                    <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&#36; 137.00</div>
                    </div>
                    <button className="checkoutbtn">CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage