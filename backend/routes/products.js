const express = require("express");
const productsModels = require("../models/products-models");
const router = express.Router();
// require('dotenv').config();

// HÄMTA ALLA PRODUKTER
router.get("/", async (request, response, next) => {
  try {
    const products = await productsModels.find();
    if (!products) {
      return response.status(404).json({ message: "Products not found" });
    }
    response.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: "Error" });
  }
});

// HÄMTA SPECIFIK PRODUKT
router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    console.log(id);
    // const product = await productsModels.findById(id);
    const product = await productsModels.findOne({ _id: id });
    // const product = await productsModels.findById({'_id': new ObjectId(id)})

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }
    response.status(200).json(product);
  }
  catch (error){
    console.error(error.message)
    response.status(500).json({ message: "Error" });
  }
});

// router.post("/add", async (request, response, next) => {
//   try {
//     let addedProduct = await productsModels.create(request.body);

//     if(!addedProduct.token) {
//       response.status(401).json({message: "Unauthorized"})
//     }
//     else {
//       response.status(201).json(addedProduct);
//     }
//   } catch (error) {
//     console.error(error.message)
//     response.status(500).json({ error: "Error" });
//   }
// });

// SKAPA PRODUKT // UTAN TOKEN SÅ SKALL ANROPET MISSLYCKAS = 401
router.post("/add", async (request, response, next) => {
    try {
      const { token } = request.body;
      const userToken = process.env.ADMIN_TOKEN;
      console.log('userToken', userToken);
      
      if (token !== userToken) {
        response.status(401).json({message: "Unauthorized"});
      } else {
        const addedProduct = await productsModels.create(request.body);
        response.status(201).json(addedProduct);
      }
  } catch (error) {
    console.error(error.message)
    response.status(500).json({ error: "Error" });
  }
});

// HÄMTA ALLA PRODUKTER FÖR EN SPECIFIK KATEGORI
router.get("/category/:id", async (request, response, next) => {
  try {
    const categoryId = request.params.id;
    console.log(categoryId);
    
    const categoryProducts = await productsModels.find({ category: categoryId });

    //fungerar som felmeddelande i backend men inte i front
    // if (categoryProducts.length === 0) {
    //   return response.status(404).json({ error: "Category not found" });
    // }
    response.status(200).json(categoryProducts);
  }
  catch (error) {
    console.error(error.message)
    response.status(500).json({ error: "Error" });
  }
})


module.exports = router;

