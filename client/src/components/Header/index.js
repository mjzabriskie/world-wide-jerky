import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
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
    <header className="">
      <div className="navbar backPrimary w-100">
        <Link className="navbar-brand text-decoration-none" to="/">
          <h1 className="secondary font-weight-bold mx-5">
            World Wide Jerky
          </h1>
        </Link>

        <div className="d-flex flex-row text-center mx-5">
          <Link className="btn btnForm rounded text-decoration-none px-4 mx-1" to="/productlist">Store</Link>
          <Link className="btn btnForm rounded text-decoration-none px-4 mx-1" to="/contact">Contact Us</Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btnForm rounded text-decoration-none px-4 mx-1" to="/profile">Me</Link>
              <a className="btn btnForm rounded text-decoration-none px-4 mx-1" href="/" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              {/* Login Modal */}
              <button
                onClick={toggleLogin}
                className="btn btnForm rounded text-decoration-none backPrimary px-4 mx-1"
              >
                Login
              </button>

              <Modal show={openLoginModal} onHide={toggleLogin}>
                <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <button className="btn btnFormReverse rounded d-block w-100" onClick={toggleModals}>Signup Instead</button>
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
                    <button className="btn btnForm rounded d-block w-100" type="submit">
                      Submit
                    </button>
                  </form>
                  {loginError && <div>Login failed</div>}
                </Modal.Body>
              </Modal>

              {/* Signup Modal */}
              <button
                onClick={toggleSignup}
                className="btn btnForm rounded text-decoration-none backPrimary px-4 mx-1"
              >
                Sign Up
              </button>

              <Modal show={openSignupModal} onHide={toggleSignup}>
                <Modal.Header closeButton>
                  <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <button className="btn btnFormReverse rounded d-block w-100" onClick={toggleModals}>Login Instead</button>
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
                    <button className="btn btnForm rounded d-block w-100" type="submit">
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
