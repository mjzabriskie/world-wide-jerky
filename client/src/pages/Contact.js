import React from "react";
import emailjs from "emailjs-com";
import Cart from '../components/Cart';

function Contact() {
    function sendEmail(e) {
        e.preventDefault();

        // These environment variables require input from a free emailjs acocunt at emailjs.com
        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, e.target, process.env.REACT_APP_YOUR_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="">
            <div className="" />
            <div className="">
                <h2>Contact Me</h2>
                <form className="" onSubmit={sendEmail} method="POST">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name" required />
                    <label htmlFor="email">Email Address</label>
                    <input className="form-control" type="email" name="email" required />
                    <label htmlFor="message">Message</label>
                    <textarea rows='8' className="form-control" type="text" name="message" required />
                    <button className="btn" type="submit">Send Email</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;