const faker = require("faker");

const db = require("../config/connection");
const { Product, User } = require("../models");

db.once("open", async () => {
  await Product.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
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
      "Old World Beef Jerky brings back the flavor and smoky goodness from a bygone era. Our Old World beef jerky is marinated, smoked and cooked with modern equipment but brings back the flavor of the Old World smoked meats. Enjoy.",
    image: [
      "/images/old-world.png",
      "/images/old-world-nutrition.png",
      "/images/old-world-ingredients.png",
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
      "Pepper Beef Jerky has a history that is thousands of years old. Pepper cultivation began many, many years ago in India, where it is native. Pepper is one of the most sought after spices in all the world.",
    image: [
      "/images/pepper.png",
      "/images/pepper-nutrition.png",
      "/images/pepper-ingredients.png",
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
      "Sweet & Spicy beef jerky has just the right amount of spice due to the crushed red peppers that are in the marinade. The peppers are red chili peppers which were first found in Central and South America and have been harvested for use since about 7,500 BC.",
    image: [
      "/images/sweet-spicy.png",
      "/images/sweet-spicy-nutrition.png",
      "/images/sweet-spicy-ingredients.png",
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
      "Teriyaki beef jerky has its origins in Japan. The name refers to a method of cooking as does yakitori and sukyaki. In all three, the yaki refers to the product being grilled. The flavor of teriyaki can be traced back to Japanese immigrants who settled in Hawaii.",
    image: [
      "/images/teriyaki.png",
      "/images/teriyaki-nutrition.png",
      "/images/teriyaki-ingredients.png",
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
      "Can't decide on just one? Try all of our delicious flavors!",
    image: [
      "/images/four-pack.png",
      "/images/old-world.png",
      "/images/pepper.png",
      "/images/sweet-spicy.png",
      "/images/teriyaki.png",
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
