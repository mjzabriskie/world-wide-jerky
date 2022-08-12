const faker = require('faker');

const db = require('../config/connection');
const { Product, User } = require('../models');

db.once('open', async () => {
  await Product.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create products
  const productData = [];

  for (let i = 0; i < 10; i += 1) {
    const productName = faker.commerce.productName() + i;
    const description = 'this is a product description';
    const image = faker.image.food();
    const price = faker.commerce.price(500, 1000, 0);
    const stock = faker.commerce.price(20, 50, 0);
    const nutrition = [{
      calories: faker.commerce.price(300, 500, 0),
      totalFat: faker.commerce.price(20, 50, 0) + " g",
      sodium: faker.commerce.price(20, 50, 0) + " mg",
      totalCarbs: faker.commerce.price(20, 50, 0) + " g",
      protein: faker.commerce.price(20, 50, 0) + " g",
    }]
    const ingredients = ['Carbonated Water', 'Sugar', 'Glucose', 'Citric Acid', 'Taurine'];

    productData.push({ productName, description, image, price, stock, nutrition, ingredients });
  }

  const createdProducts = await Product.collection.insertMany(productData);

  console.log('all done!');
  process.exit(0);
});
