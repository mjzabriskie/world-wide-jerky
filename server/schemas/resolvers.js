const { User, Product } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;

      }

      throw new AuthenticationError("Not logged in me");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");

      throw new AuthenticationError("Not logged in user");
    },
    users: async () => {
      if (context.user) {
        return User.find();
      }
      throw new AuthenticationError("Not logged in users");
    },
    products: async () => {
      return Product.find();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addProduct: async (parent, args, context) => {
      if (context.user) {
        const product = await Product.create({ ...args });

        return product;
      }

      throw new AuthenticationError(
        "You must be logged in to create a product"
      );
    },
    addNutrition: async (parent, args, context) => {
      if (context.user) {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: args.productId },
          { $push: { nutrition: { ...args }}},
          { new: true}
        );

        return updatedThought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
