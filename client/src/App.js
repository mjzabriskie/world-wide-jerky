import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Contact from "./pages/Contact";
import CartPage from "./pages/CartLanding/CartPage";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import ProductList from "./pages/ProductList";
import Signup from "./pages/Signup";
import Profile from './pages/Profile';
import Success from "./pages/Success";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import { StoreProvider } from "./utils/GlobalState";

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/productlist" element={<ProductList />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cartpage" element={<CartPage />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
