import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


const OrderHistoryComp = () => {
    const { data } = useQuery(QUERY_ME);
    let user;

    if(data) {
        user = data.me;
    }

    return (
        <>
            <div>Order History for {user.username}</div>
            {user ? (
                <>
                    {user.orders.map((order) => (
                        <div key={order._id} className="card mb-2" style={{ width: "18rem" }}>
                            <div className="card-header">
                                Items Ordered on {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}:
                            </div>
                            <ul className="list-group list-group-flush">
                                {order.products.map(({ _id, name, price}, index) => (
                                    <div key={index}>
                                        <li className="list-group-item">{name} Jerky ${price / 100}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>

            ) : null}
            
        
        </>
    )
    
}

export default OrderHistoryComp;

