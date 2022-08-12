// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    admin: 
  }
  type Product {
    _id: ID
    unitPrice: Int
    productName: String
    nutrition: [String]
    ingredients: [String]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    user(username: String!): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProduct(productName: String!): Product
  }
`;

// export the typeDefs
module.exports = typeDefs;
