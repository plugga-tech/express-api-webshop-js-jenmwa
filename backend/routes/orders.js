var express = require("express");
const ordersModels = require("../models/orders-models");
const usersModels = require("../models/users-models");
var router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post("/add", async (request, response, next) => {
  try {
    const order = await ordersModels.create(request.body);
    response.status(201).json(order);
  } catch {
    console.error(error.message);
    response.status(500).json({ error: "Error" });
  }
});

// HÄMTA ALLA ORDERS - BETYG G
router.get("/all", async (request, response, next) => {
  try {
    const orders = await ordersModels.find().populate("products");

    if (!orders) {
      return response.status(404).json({ message: "No orders found" });
    }
    response.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: "Error" });
  }
});

router.get("/all/:token", async (request, response, next) => {
  try {
    const { token } = request.params;

    if (token !== process.env.ADMIN_TOKEN) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const orders = await ordersModels.find().populate("products");
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
