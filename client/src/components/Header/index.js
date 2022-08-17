import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_LOGIN, TOGGLE_SIGNUP } from "../../utils/actions";

const Header = (props) => {
  const [state, dispatch] = useStoreContext();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [login, { loginError }] = useMutation(LOGIN_USER);
  const [addUser, { singupError }] = useMutation(ADD_USER);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

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

  const handleLoginClose = () => { setOpenLoginModal(false); }
  const handleLoginShow = () => setOpenLoginModal(true);

  function toggleLogin() {
    dispatch({ type: TOGGLE_LOGIN });
  }

  function toggleSignup() {
    dispatch({ type: TOGGLE_SIGNUP });
  }

  function toggleModals() {
    toggleLogin();
    toggleSignup();
  }

  // signup modal stuff

  const [openSignupModal, setOpenSignupModal] = useState(false);

  const handleSignupClose = () => setOpenSignupModal(false);
  const handleSignupShow = () => setOpenSignupModal(true);

  useEffect(() => {
    state.loginOpen ? handleLoginShow() : handleLoginClose();
    state.signupOpen ? handleSignupShow() : handleSignupClose();
  }, [state, dispatch]);

  return (
    <header className="d-flex justify-content-between backPrimary">
      <Link className="navbar-brand text-decoration-none" to="/">
        <h1 className="font-weight-bold mx-4 my-3">
          World Wide Jerky
        </h1>
      </Link>

      <nav className="navbar navbar-expand-md w-100">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle='collapse'
          data-bs-target='#toggleMobileMenu'
          aria-controls="toggleMobileMenu"
          aria-expanded='false'
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="toggleMobileMenu">
          <ul className="navbar-nav ms-auto text-center">
            <li>
              <Link className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" to="/productlist">STORE</Link>
            </li>
            <li>
              <Link className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" to="/contact">CONTACT</Link>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li>
                  <Link className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" to="/profile">ME</Link>
                </li>
                <li>
                  <a className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" href="/" onClick={logout}>LOGOUT</a>
                </li>
              </>
            ) : (
              <>
                {/* Login Modal */}
                <li>
                  <button
                    onClick={toggleLogin}
                    className="nav-link btn btnForm rounded text-decoration-none px-4 m-1"
                  >
                    LOGIN
                  </button>
                </li>

                {/* Signup Modal */}
                <li>
                  <button
                    onClick={toggleSignup}
                    className="nav-link btn btnForm rounded text-decoration-none px-4 m-1"
                  >
                    SIGN UP
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div>
        <Modal show={openLoginModal} onHide={toggleLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button className="btn btnFormReverse rounded d-block w-100 my-1" onClick={toggleModals}>SIGN UP</button>
            <form onSubmit={handleLoginFormSubmit}>
              <label htmlFor="email">Email</label>
              <input
                className="form-control rounded"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form-control rounded"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn btnForm rounded d-block w-100 my-1" type="submit">
                SUBMIT
              </button>
            </form>
            {loginError && <div>Login failed</div>}
          </Modal.Body>
        </Modal>

        <Modal show={openSignupModal} onHide={toggleSignup}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button className="btn btnFormReverse rounded d-block w-100 my-1" onClick={toggleModals}>LOGIN</button>
            <form onSubmit={handleSignupFormSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className="form-control rounded"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                className="form-control rounded"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form-control rounded"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn btnForm rounded d-block w-100 my-1" type="submit">
                SUBMIT
              </button>
            </form>
            {singupError && <div>Sign up failed</div>}
          </Modal.Body>
        </Modal>
      </div>
    </header>
  );
};

export default Header;