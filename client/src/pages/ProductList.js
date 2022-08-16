import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import ProductModal from "../components/Product";
import Auth from "../utils/auth";
import Cart from "../components/Cart";

const ProductList = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  return (
    <main>
      <h1 className="text-center mt-5 mx-auto w-50 pb-4 border-bottom border-3 border-black">Shop</h1>
      <div className="container d-flex flex-wrap justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products &&
          products.map((product) => (
            <ProductModal
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              stock={product.stock}
              ingredients={product.ingredients}
            />
          ))
        )}
      </div>
      {Auth.loggedIn() && <Cart />}
    </main>
  );
};

export default ProductList;
