// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: String
    stock: String
    nutrition: [Nutrition]
    ingredients: [String]
  }
  type Auth {
    token: ID!
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    me: User
    user(username: String!): User
    checkout(products: [ID]!): Checkout
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProduct()
  }
`;

// export the typeDefs
module.exports = typeDefs;
