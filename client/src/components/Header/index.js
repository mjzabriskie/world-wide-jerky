import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";

const Header = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [login, { loginError }] = useMutation(LOGIN_USER);
  const [addUser, { singupError }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleLoginFormSubmit = async (event) => {
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

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  // login modal stuff
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleLoginClose = () => setOpenLoginModal(false);
  const handleLoginShow = () => setOpenLoginModal(true);

  // signup modal stuff

  const [openSignupModal, setOpenSignupModal] = useState(false);

  const handleSignupClose = () => setOpenSignupModal(false);
  const handleSignupShow = () => setOpenSignupModal(true);

  return (
    <header className="d-flex flex-wrap justify-content-center w-100">
      <div className="navbar backPrimary w-100">
        <Link className="navbar-brand text-decoration-none px-5" to="/">
          <h1 className="secondary font-weight-bold mx-5 px-5">
            World Wide Jerky
          </h1>
        </Link>

        <div className="d-flex flex-row text-center mx-5 px-5">
          <Link className="text-decoration-none px-2" to="/product-list">
            Shop
          </Link>
          <Link className="text-decoration-none px-2" to="/contact">
            Contact Us
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="text-decoration-none px-2" to="/profile">
                Me
              </Link>
              <a
                className="text-decoration-none px-2"
                href="/"
                onClick={logout}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              {/* Login Modal */}
              <button
                onClick={handleLoginShow}
                className="text-decoration-none backPrimary btnForm px-4"
              >
                Login
              </button>

              <Modal show={openLoginModal} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleLoginFormSubmit}>
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
                  {loginError && <div>Login failed</div>}
                </Modal.Body>
              </Modal>

              {/* Signup Modal */}
              <button
                onClick={handleSignupShow}
                className="text-decoration-none backPrimary btnForm px-4"
              >
                Sign Up
              </button>

              <Modal show={openSignupModal} onHide={handleSignupClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleSignupFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your username"
                      name="username"
                      type="username"
                      id="username"
                      value={formState.username}
                      onChange={handleChange}
                    />
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
                  {singupError && <div>Sign up failed</div>}
                </Modal.Body>
              </Modal>
              {/* <Link className="text-decoration-none px-2" to="/login">Login</Link> */}
              {/* <Link className="text-decoration-none px-2" to="/signup">Signup</Link> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
