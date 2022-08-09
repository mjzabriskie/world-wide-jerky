const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: 'You must have a product name',
      minlength: 1,
      maxlength: 280
    },
    unitPrice: {

    },
    ingredients: [],
    nutrition: {

    },
    allergens: {

    },
    image: {

    },
    description: {

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Product = model('Product', productSchema);

module.exports = Product;
