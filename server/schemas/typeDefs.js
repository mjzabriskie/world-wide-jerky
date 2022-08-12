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
  type Query {
    users: [User]
    products: [Product]
  }
`;

// export the typeDefs
module.exports = typeDefs;
