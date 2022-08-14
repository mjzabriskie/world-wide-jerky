import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartLanding/CartPage";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleProduct from "./pages/SingleProduct";
//import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import { StoreProvider } from './utils/GlobalState';
import Auth from "./utils/auth";
import Cart from "./components/Cart";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <StoreProvider>
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/cartpage" element={<CartPage />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </div>
            <Footer />
            {Auth.loggedIn() && <Cart />}
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
