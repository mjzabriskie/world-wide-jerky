import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import "./style.css";


const OrderHistoryComp = () => {
    const { data } = useQuery(QUERY_ME);
    let user;

    if (data) {
        user = data.me;
    }

    return (
        <>
            <h3>Order History for {user.username}</h3>
            <div className='flex-row'>
                {user ? (
                    <>
                        {user.orders.map((order) => (
                            <div key={order._id} className="card mb-2 rounded col-12 col-md-6">
                                <div className="card-header">
                                    Items Ordered on {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}:
                                </div>
                                <ul className="list-group list-group-flush">
                                    {order.products.map(({ _id, name, price }, index) => (
                                        <li key={index} className="list-group-item">{name} Jerky ${price / 100}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </>
    )
}

export default OrderHistoryComp;

