// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    admin: Boolean
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: [String]
    price: String
    stock: String
    nutrition: [Nutrition]
    ingredients: [String]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Nutrition {
    calories: String
    totalFat: String
    sodium: String
    totalCarbs: String
    protein: String
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
    users: [User]
    user(username: String!): User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    products: [Product]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, admin: Boolean): Auth
    updateUser(email: String!, admin: Boolean!): User
    addProduct(name: String!, price: String!, stock: String!, description: String, image: String, ingredients: [String]): Product
    addNutrition(productId: ID!, calories: String, totalFat: String, sodium: String, totalCarbs: String, protein: String): Product
    addOrder(products: [ID]!): Order
  }
`;

// export the typeDefs
module.exports = typeDefs;
