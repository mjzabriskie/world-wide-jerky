const faker = require("faker");

const db = require("../config/connection");
const { Product, User } = require("../models");

db.once("open", async () => {
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

  const oldWorld = {
    name: "Old World",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo eget velit eleifend posuere id et nibh. Fusce egestas molestie mauris, at eleifend.",
    image: [
      "/images/old-world.jpeg",
      "/images/old-world-nutrition.jpeg",
      "/images/old-world-ingredients.jpeg",
    ],
    price: "845",
    stock: "4300",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Glucose",
      "Citric Acid",
      "Taurine",
    ],
  };
  const pepper = {
    name: "Pepper",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo eget velit eleifend posuere id et nibh. Fusce egestas molestie mauris, at eleifend.",
    image: [
      "/images/pepper.jpeg",
      "/images/pepper-nutrition.jpeg",
      "/images/pepper-ingredients.jpeg",
    ],
    price: "845",
    stock: "4300",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Glucose",
      "Citric Acid",
      "Taurine",
    ],
  };
  const sweetSpicy = {
    name: "Sweet & Spicy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo eget velit eleifend posuere id et nibh. Fusce egestas molestie mauris, at eleifend.",
    image: [
      "/images/sweet-spicy.jpeg",
      "/images/sweet-spicy-nutrition.jpeg",
      "/images/sweet-spicy-ingredients.jpeg",
    ],
    price: "845",
    stock: "4300",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Glucose",
      "Citric Acid",
      "Taurine",
    ],
  };
  const teriyaki = {
    name: "Teriyaki",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo eget velit eleifend posuere id et nibh. Fusce egestas molestie mauris, at eleifend.",
    image: [
      "/images/teriyaki.jpeg",
      "/images/teriyaki-nutrition.jpeg",
      "/images/teriyaki-ingredients.jpeg",
    ],
    price: "845",
    stock: "4300",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Glucose",
      "Citric Acid",
      "Taurine",
    ],
  };
  const fourPack = {
    name: "Four-pack Combo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo eget velit eleifend posuere id et nibh. Fusce egestas molestie mauris, at eleifend.",
    image: [
      "/images/four-pack.jpeg",
      "/images/old-world.jpeg",
      "/images/pepper.jpeg",
      "/images/sweet-spicy.jpeg",
      "/images/teriyaki.jpeg",
    ],
    price: "2200",
    stock: "",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Glucose",
      "Citric Acid",
      "Taurine",
    ],
  };

  // for (let i = 0; i < 10; i += 1) {
  //   const name = faker.commerce.productName();
  //   const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget elit pulvinar, accumsan dui sagittis, fermentum mi. Sed sagittis lorem ut est rhoncus, bibendum hendrerit est viverra. Suspendisse molestie, dui sed convallis gravida, lectus ante euismod nunc, pulvinar hendrerit magna lorem at neque. Morbi accumsan sed sem quis vulputate. Morbi.';
  //   let image = faker.image.food();
  //   image = image.replace('lorempixel', 'loremflickr');
  //   const price = faker.commerce.price(500, 1000, 0);
  //   const stock = faker.commerce.price(20, 50, 0);
  //   const nutrition = {
  //     calories: faker.commerce.price(300, 500, 0),
  //     totalFat: faker.commerce.price(20, 50, 0) + " g",
  //     sodium: faker.commerce.price(20, 50, 0) + " mg",
  //     totalCarbs: faker.commerce.price(20, 50, 0) + " g",
  //     protein: faker.commerce.price(20, 50, 0) + " g",
  //   }
  //   const ingredients = ['Carbonated Water', 'Sugar', 'Glucose', 'Citric Acid', 'Taurine'];

  //   if( i === 0) {
  //     productData.push(oldWorld);
  //   }

  productData.push(oldWorld, pepper, sweetSpicy, teriyaki, fourPack);

  const createdProducts = await Product.collection.insertMany(productData);

  console.log("all done!");
  process.exit(0);
});
