import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
//import { Link } from "react-router-dom";
//import { Card, Button } from "react-bootstrap";
import ProductModal from "../components/Product";

const ProductList = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  return (
    <main>
      <h1 className="text-center my-5">Shop</h1>
      <div className="container d-flex flex-wrap justify-content-center">
        {products &&
          products.map((product) => (
            <div key={product._id} className="m-2 shadow">
            <ProductModal product={product} />
            </div>
          ))}
      </div>
    </main>
  );
};

export default ProductList;
