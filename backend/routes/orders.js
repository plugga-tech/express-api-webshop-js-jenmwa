var express = require("express");
const ordersModels = require("../models/orders-models");
const usersModels = require("../models/users-models");
const productsModels = require("../models/products-models");
var router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post("/add", async (request, response, next) => {
  try {
    const order = await ordersModels.create(request.body);

    const orderDetails = await ordersModels
      .findById(order._id)
      .populate('products.productId');

    const products = order.products;
    // console.log(order.products)
    // console.log(productId);
    //för varje productId - quantity

    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const product = await productsModels.findById({ _id: productId });
      if (product) {
        if (product.lager >= quantity) {
          product.lager -= quantity;
          await product.save();
        } else {
          return response.status(400).json({ message: `we're sorry, but we have not got enough ${product.name} in stock right now` });
        }
      }
    }

    response.status(201).json(orderDetails);
  } catch (error){
    console.error(error.message);
    response.status(500).json({ error: "Error" });
  }
});

// HÄMTA ALLA ORDERS - BETYG G
// router.get("/all", async (request, response, next) => {
//   try {
//     const orders = await ordersModels.find().populate("products.productId");

//     if (!orders) {
//       return response.status(404).json({ message: "No orders found" });
//     }
//     response.status(200).json(orders);
//   } catch (error) {
//     console.error(error.message);
//     response.status(500).json({ message: "Error" });
//   }
// });

// HÄMTA ALLA ORDERS, KEY MÅSTE ANGES FÖR ATT FÅ TILLGÅNG TILL ORDERS // ANNARS FAIL
router.get("/all/:token", async (request, response, next) => {
  try {
    const { token } = request.params;

    if (token !== process.env.ADMIN_TOKEN) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const orders = await ordersModels.find().populate('products.productId');
    response.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: "Error" });
  }
});

// HÄMTA ORDERS FÖR EN USER // SKALL MISSLYCKAS = INGEN KEY  // SVARA MED 401 //SKALL LYCKAS = KEY
router.post("/user", async (request, response, next) => {
  try {
    //ta emot från post
    const { user, token } = request.body;
    console.log(user, token);

    //kontrollera token
    if (token !== process.env.ADMIN_TOKEN) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    // //hämta user
    const findUser = await usersModels.findById(user);
    console.log(findUser);
    if (!findUser) {
      return response.status(404).json({ message: "User Not Found" });
    }
    //hämta orders kopplade till user
    const orders = await ordersModels.find({ user: user });
    console.log(orders);

    return response.status(201).json(orders);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: "Error" });
  }
});

module.exports = router;
