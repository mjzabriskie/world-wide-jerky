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
  image: String
  price: String
  stock: String
  nutrition: [Nutrition]
  ingredients: [String]
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
  type Query {
    users: [User]
    products: [Product]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!, admin: Boolean): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;
