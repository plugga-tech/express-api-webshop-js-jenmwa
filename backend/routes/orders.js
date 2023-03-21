var express = require("express");
const ordersModels = require("../models/orders-models");
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

// HÄMTA ALLA ORDERS
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

module.exports = router;
