import React, { useEffect } from "react";
import CarouselImage from "../CarouselImage";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import Carousel from 'react-bootstrap/Carousel';

const CarouselComponent = () => {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products,
                });
            });
        }
    }, [data, loading, dispatch]);

    return (
        <Carousel>
            {loading ? <h2>Loading...</h2>
                :
                state.products.map((product, index) => (
                    <Carousel.Item key={product._id}>
                        <div>
                            <CarouselImage
                                image={product.image}
                                name={product.name}
                                description={product.description}
                            />
                        </div>
                    </Carousel.Item>
                ))}
        </Carousel>
    )
}

export default CarouselComponent;