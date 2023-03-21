const express = require("express");
const productsModels = require("../models/products-models");
const router = express.Router();

// HÄMTA ALLA PRODUKTER
router.get("/", async (req, res, next) => {
  try {
    const products = await productsModels.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("error", error);
    console.error(error.message);
    res.status(500).json({ error: "Error" });
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    console.log(id);
    const product = await productsModels.findOne({ _id: id });

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }
    response.send(product)
  }
  catch (error){
    console.log('error', error);
    console.error(error.message)
    response.status(500).json({ message: "Error" });
  }
});

router.post("/add", async (request, response, next) => {
  try {
    // let newProduct = {
    //   name: request.body.name,
    //   description: request.body.description,
    //   price: request.body.price,
    //   lager: request.body.lager
    // };
    let addedProduct = await productsModels.create(request.body);
    response.status(201).json(addedProduct);
  } catch (error) {
    console.log("error", error);
    console.error(error.message)
    res.status(500).json({ error: "Error" });
  }
});

module.exports = router;
