const { Schema } = require('mongoose');

const nutritionSchema = new Schema(
  {
    calories: {
      type: String
    },
    totalFat: {
      type: String
    },
    sodium: {
      type: String
    },
    totalCarbs: {
      type: String
    },
    protein: {
      type: String
    }
  }
);

module.exports = nutritionSchema;
