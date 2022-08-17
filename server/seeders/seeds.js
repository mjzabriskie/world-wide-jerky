const faker = require("faker");

const db = require("../config/connection");
const { Product, User } = require("../models");

db.once("open", async () => {
  await Product.deleteMany({});
  await User.deleteMany({});

  // create products
  const productData = [];

  const oldWorld = {
    name: "Old World",
    description:
      "Old World Beef Jerky brings back the flavor and smoky goodness from a bygone era. Our Old World beef jerky is marinated, smoked and cooked with modern equipment but brings back the flavor of Old World smoked meats. Enjoy.",
    image: [
      "/images/old-world.png",
      "/images/old-world-nutrition.png",
      "/images/old-world-ingredients.png",
    ],
    price: "1199",
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
    price: "1199",
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
    price: "1199",
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
    price: "1199",
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
    description: "Can't decide on just one? Try all of our delicious flavors!",
    image: [
      "/images/four-pack.png",
      "/images/old-world.png",
      "/images/pepper.png",
      "/images/sweet-spicy.png",
      "/images/teriyaki.png",
    ],
    price: "3999",
    stock: "",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Glucose",
      "Citric Acid",
      "Taurine",
    ],
  };

  productData.push(oldWorld, pepper, sweetSpicy, teriyaki, fourPack);

  const createdProducts = await Product.collection.insertMany(productData);

  console.log("all done!");
  process.exit(0);
});
