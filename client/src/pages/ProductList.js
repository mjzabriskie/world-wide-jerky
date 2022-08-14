import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const ProductList = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  return (
    <main>
      <h1 className="text-center my-5">World Wide Jerky Shop</h1>
      <h3 className="text-center mb-5">Check out our flavors</h3>
      <div className="container d-flex flex-wrap">
        {products &&
          products.map((product) => (
            <Card key={product._id} style={{ width: "18rem"}}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title className="text-center">
                  <Link
                    to={`/product/${product._id}`}
                    style={{ fontWeight: 700 }}
                    // className="text-light"
                  >
                    {product.name}
                  </Link>
                </Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="d-flex justify-content-around">
                <Button className="btn-products" variant="primary">More Info</Button>
                <Button className="btn-products" variant="primary">Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
    </main>
  );
};

export default ProductList;
