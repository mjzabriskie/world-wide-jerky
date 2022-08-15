import React from "react";
import './index.css'
function CartPage() {
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
                    <div className="row border-top border-bottom m-0">
                        <div className="row main align-items-center m-0">
                            <div className="col-2 pad"><img className="img-fluid cart-image" src="https://i.imgur.com/1GrakTl.jpg" alt="" /></div>
                            <div className="col pad">
                                <div className="row text-muted m-0">Shirt</div>
                                <div className="row m-0">Cotton T-shirt</div>
                            </div>
                            <div className="col pad">
                                <a className="pad" href="/">-</a><a href="/" className="border pad">1</a><a className="pad" href="/">+</a>
                            </div>
                            <div className="col pad">&#36; 44.00 <span className="delete-item">&#10005;</span></div>
                        </div>
                    </div>
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
                        <div className="col text-right">&#36; 137.00</div>
                    </div>
                    <button className="checkoutbtn">CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage