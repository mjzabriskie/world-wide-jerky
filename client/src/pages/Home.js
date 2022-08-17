import React from "react";
import Carousel from "../components/Carousel";
import About from "../components/About";
import Cart from "../components/Cart";
import Auth from "../utils/auth";

const Home = () => {
  return (
    <main>
      <div className="mb-4 hero d-flex justify-content-center flex-wrap align-items-center">
        <img src="/images/wwj-logo.png" className="hero-logo" alt="world wide jerky logo" />
      </div>
      <div className="container">
        <Carousel />
        <About />
        {Auth.loggedIn() && <Cart />}
      </div>
    </main>
  );
};

export default Home;
