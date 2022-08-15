import React from "react";
import Auth from "../utils/auth";
import Carousel from "../components/Carousel";
import About from "../components/About";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="bg-primary">
        {loggedIn && (
          <div className="">
            LOGGED IN
          </div>
        )}
        {!loggedIn && <div className="bg-secondary">
          NOT LOGGED IN
        </div>}
      </div>
      <Carousel />
      <About />
    </main>
  );
};

export default Home;
