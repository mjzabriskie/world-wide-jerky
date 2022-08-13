import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../../utils/mutations";

const Header = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.log(e);
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);

  return (
    <header className="d-flex flex-wrap justify-content-center w-100">
      <div className="navbar backPrimary w-100">
          <Link className="navbar-brand text-decoration-none px-5" to="/">
            <h1 className="secondary font-weight-bold mx-5 px-5">World Wide Jerky</h1>
          </Link>

          <div className="text-center text-decoration-none mx-5 px-5">
            {Auth.loggedIn() ? (
              <>
                <Link className="text-decoration-none px-2" to="/profile">Me</Link>
                <a  className="text-decoration-none px-2" href="/" onClick={logout}>Logout</a>
              </>
            ) : (
              <>
                <button onClick={handleShow}>
                  Login
                </button>

                <Modal show={openModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      id="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button className="btn d-block w-100" type="submit">
                      Submit
                    </button>
                  </form>
                  {error && <div>Login failed</div>}
                  </Modal.Body>
                </Modal>
                {/* <Link className="text-decoration-none px-2" to="/login">Login</Link> */}
                <Link className="text-decoration-none px-2" to="/signup">Signup</Link>
              </>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
