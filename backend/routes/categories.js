const express = require("express");
const categoryModels = require("../models/category-models");
const router = express.Router();

/* GET home page. */
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

router.post("/add", async (request, response, next) => {
  try {
    let addCategory = await categoryModels.create(request.body);

    if(!addCategory.token) {
      response.status(401).json({message: "Unauthorized"})
    }
    else {
      response.status(201).json(addCategory);
    }
  } catch (error) {
    console.error(error.message)
    response.status(500).json({ error: "Error" });
  }
});

module.exports = router;
