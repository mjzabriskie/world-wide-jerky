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
      <nav className="navbar bg-dark w-100">
        <div className="navbar-brand text-decoration-none p-2">
          <Link to="/">
            <h1 className="text-light font-weight-bold px-5">World Wide Jerky</h1>
          </Link>

          <div className="text-center">
            {Auth.loggedIn() ? (
              <>
                <Link to="/profile">Me</Link>
                <a href="/" onClick={logout}>Logout</a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
    </header>
  );
};

export default Header;
