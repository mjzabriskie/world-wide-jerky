import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      description
      image
      price
      stock
      ingredients
      nutrition {
        calories
        totalFat
        sodium
        totalCarbs
        protein
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      admin
    }
  }
`;

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    admin
  }
}
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
