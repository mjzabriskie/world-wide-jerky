import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  console.log(data)

  //navigate to personal profile page if username is the logged in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Container>
      <Row>
        <Col sm={4}> 
          <ul>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>Button to change password?</li>
            <li>IF ADMIN, button that pulls up page to search users and change admin</li>
            <li>IF ADMIN, button that changes page on right to add a product</li>
          </ul>
        </Col>
        <Col sm={8}>
          This shows order history by default, if buttons are clicked will change to update password, change admit, or add product. These will probably be components!
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
