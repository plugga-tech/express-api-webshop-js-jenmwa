const express = require("express");
const categoryModels = require("../models/category-models");
const router = express.Router();

// HÄMTA ALLA KATEGORIER
router.get("/", async (request, response, next) => {
  try {
    const categories = await categoryModels.find();
    if (!categories) {
      return response.status(404).json({ message: "categories not found" });
    }
    response.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: "Error" });
  }
});

// SKAPA KATEGORI, KEY MÅSTE ANGES // UTAN KEY SVARA 401 G
// router.post("/add", async (request, response, next) => {
//   try {
//     let addCategory = await categoryModels.create(request.body);

//     if(!addCategory.token) {
//       response.status(401).json({message: "Unauthorized"})
//     }
//     else {
//       response.status(201).json(addCategory);
//     }
//   } catch (error) {
//     console.error(error.message)
//     response.status(500).json({ error: "Error" });
//   }
// });

// SKAPA KATEGORI, KEY MÅSTE ANGES // UTAN KEY SVARA 401
router.post("/add", async (request, response, next) => {
  try {
    const { token } = request.body;
    const userToken = process.env.ADMIN_TOKEN;
    console.log("userToken", userToken);

    if (token !== userToken) {
      response.status(401).json({ message: "Unauthorized" });
    } else {
      let addCategory = await categoryModels.create(request.body);
      response.status(201).json(addCategory);
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Error" });
  }
});

module.exports = router;
