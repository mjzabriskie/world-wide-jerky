import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

const Profile = (props) => {
  const { username: userParam } = useParams();

  // useMutation will be used to change passwords and update admin status

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  console.log(user)

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


  return (
    <Container>
      <Row>
        <Col sm={4} className="border border-dark p-2">
          <h2>{user.username}'s Profile</h2>
          <div>
            <button>Update Password</button>
            {/* Not functional */}
            {Auth.admin() ? (
              <>
              <button>Update User Admin</button>
              <button>Add a Product</button>
              </>
            ) : (
              <button>Order History</button>
            )}
          </div>
        </Col>
        <Col sm={8} className="border border-dark p-2">
          This shows order history by default, if buttons are clicked will change to update password, change admit, or add product. These will probably be components!
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
