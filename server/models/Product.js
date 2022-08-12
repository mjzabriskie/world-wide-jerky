const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: 'You must have a product name',
      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 280
    },
    // unitPrice: {

    // },
    // ingredients: [],
    // nutrition: {

    // },
    // allergens: {

    // },
    // image: {

    // },
    // description: {

    // },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Product = model('Product', productSchema);

module.exports = Product;
