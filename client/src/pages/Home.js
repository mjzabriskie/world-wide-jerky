import React from "react";
import Carousel from "../components/Carousel";
import About from "../components/About";
import Cart from "../components/Cart"
import Auth from "../utils/auth";

const Home = () => {
  return (
    <main>
      <div className="mb-4">
        <img src="./images//four-pack.jpeg" className="hero" alt="" />
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
