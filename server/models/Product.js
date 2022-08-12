const { Schema, model } = require('mongoose');
const nutritionSchema = require('./Nutrition');
//const dateFormat = require('../utils/dateFormat');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: 'You must have a product name',
      trim: true,
      minlength: 1,
      maxlength: 500
    },
    description: {
      type: String,
      required: 'You must enter a description',
      trim: true,
      maxlength: 1500
    },
    image: {
      type: String
    },
    price: {
      type: String,
      required: 'You must enter a unit price'
    },
    stock: {
      type: String,
    },
    nutrition: {
      type: [nutritionSchema]
    },
    ingredients: {
      type: [String]
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Product = model('Product', productSchema);

module.exports = Product;
