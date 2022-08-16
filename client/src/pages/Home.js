import React from "react";
import Carousel from "../components/Carousel";
import About from "../components/About";
import Cart from "../components/Cart"
import Auth from "../utils/auth";

const Home = () => {
  return (
    <main>
      <Carousel />
      <About />
      {Auth.loggedIn() && <Cart />}
    </main>
  );
};

export default Home;
