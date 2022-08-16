import React, { useState } from "react";
import emailjs from "emailjs-com";
import Modal from "react-bootstrap/Modal";
import './style.css'

function Contact() {
    const [modalText, setModalText] = useState('');
    const [openMessageModal, setOpenMessageModal] = useState(false);

    const handleModalClose = () => setOpenMessageModal(false);
    const handleModalShow = () => setOpenMessageModal(true);

    function sendEmail(e) {
        e.preventDefault();

        // These environment variables require input from a free emailjs acocunt at emailjs.com
        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, e.target, process.env.REACT_APP_YOUR_PUBLIC_KEY)
            .then((result) => {
                setModalText('Your email has been successfully sent.');
                handleModalShow();
            }, (error) => {
                setModalText('There was an error.');
                handleModalShow();
            });
    };

    return (
        <div className="container my-4">
            <div className="mt-2 mb-2 rounded w-90 mx-auto" id="contact">
                <div className="row m-0">
                    <div className="col-md-8 mx-auto contact-2">
                        <h2>Contact Us</h2>
                        <form className="" onSubmit={sendEmail} method="POST">
                            <label htmlFor="name">Name</label>
                            <input className="form-control rounded" type="text" name="name" required />
                            <label htmlFor="email">Email Address</label>
                            <input className="form-control rounded" type="email" name="email" required />
                            <label htmlFor="message">Message</label>
                            <textarea rows='8' className="form-control rounded" type="text" name="message" required />
                            <button className="btn btnForm rounded my-1" type="submit">SEND EMAIL</button>
                        </form>
                    </div>
                </div>
                <Modal show={openMessageModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message Sent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p id="message-result">{modalText}</p>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Contact;