import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }

  return (
    <header className="d-flex flex-wrap justify-content-center w-100">
      <div className="navbar bg-dark w-100">
          <Link className="navbar-brand text-decoration-none text-light font-weight-bold px-5" to="/">
            <h1 className="px-5">World Wide Jerky</h1>
          </Link>

          <div className="text-center mx-5">
            {Auth.loggedIn() ? (
              <>
                <Link to="/profile">Me</Link>
                <a href="/" onClick={logout}>Logout</a>
              </>
            ) : (
              <>
                <Link className="text-decoration-none px-2" to="/login">Login</Link>
                <Link className="text-decoration-none px-2" to="/signup">Signup</Link>
              </>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
