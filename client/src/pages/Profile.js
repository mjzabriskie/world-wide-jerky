import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import aTrue from '../utils/admin';
import  AddProductComp from '../components/Profile/AddProduct';
import  UpdateUserComp from '../components/Profile/UpdateUser';
import  UpdatePassComp from '../components/Profile/UpdatePassword';
import  OrderHistoryComp from '../components/Profile/OrderHistory';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME, UPDATE_USER } from "../utils/queries";

const Profile = (props) => {
  const [defPage, setPage] = useState("Password")

  const { username: userParam } = useParams();

  // useMutation will be used to change passwords and update admin status

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  function userAdminCheck(user) {
    try {
      aTrue.check(user)
    } catch (e) {
      console.error(e);
    }
  }

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page.
      </h4>
    );
  }

  // switching components

  const handleClick = (pageState) => {
    setPage(pageState)
  }

  userAdminCheck();
  return (
    <Container>
      <Row>
        <Col sm={4} className="p-2">
          <div className="border border-dark p-2 m-1">
            <h3 className="p-2 border-bottom border-dark">{user.username}'s Profile</h3>
            <div>
              <button className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" onClick={() => handleClick("Password")}>Update Password</button>
              {aTrue.check() ? (
                <>
                <button className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" onClick={() => handleClick('User')}>Update User Admin</button>
                <button className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" onClick={() => handleClick('Product')}>Add a Product</button>
                </>
              ) : (
                <button className="nav-link btn btnForm rounded text-decoration-none px-4 m-1" onClick={() => handleClick('Order')}>Order History</button>
              )}
            </div>
          </div>
        </Col>
        <Col sm={8} className="p-2">
          <div className="border border-dark p-2 m-1">
          {defPage === 'Password' && <UpdatePassComp />}
          {defPage === 'User' && <UpdateUserComp />}
          {defPage === 'Product' && <AddProductComp />}
          {defPage === 'Order' && <OrderHistoryComp />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
