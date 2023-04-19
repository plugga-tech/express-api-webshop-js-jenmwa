const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const crypto = require("crypto-js");
const userModels = require("../models/users-models");

router.use(cookieParser());

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get("/", async (req, res, next) => {
  try {
    const users = await userModels.find().select("name email");
    if (!users) {
      res.status(404).json({ message: "No Users found" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error" });
  }
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post("/", async (req, res, next) => {
  try {
    const id = req.body.id;
    console.log(id);

    const user = await userModels.findOne({ _id: id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error" });
  }
});

// SKAPA USER
router.post("/add", async (request, response, next) => {
  try {
    const existingUser = await userModels.findOne({
      email: request.body.email,
    });
    if (existingUser) {
      return response.status(400).json({ error: "User already exists" });
    }
    let newUser = {
      name: request.body.name,
      email: request.body.email,
    };
    let userPassword = crypto.SHA3(request.body.password).toString();
    newUser.password = userPassword;

    const addedUser = await userModels.create(newUser);
    response.status(201).json(addedUser);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Error" });
  }
});

// LOGGA IN USER
router.post("/login", async (request, response, next) => {
  const { email, password } = request.body;
  console.log("email & password", email, password);

  try {
    const findUser = await userModels.findOne({ email: email });

    if (!findUser) {
      response.status(404).json({ error: "User not found" });
      return;
    }

    if (crypto.SHA3(password).toString() === findUser.password) {
      // const token = process.env.ADMIN_TOKEN;
      // console.log('userToken', token);
      response.cookie("userToken", "1234key1234");
      console.log("kaka sparad");

      response.status(201).json({ email: findUser.email, id: findUser._id });
    } else {
      response.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Error" });
  }
});

// försölker få till cookie MEN jag klarar det inte. dessa POST sätter en cookie med POSTMAN, men jag får itne till det i min kod.
// router.post("/set", async (req, res, next) => {
//   try {
//     res.cookie('userTokenTESTtestTEST', '1234key1234')
//     res.send('kaka sparad')
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Error" });
//   }
// });

// router.post("/cookies", async (req, res, next) => {
//   try {
//     console.log(req.cookies)
//     res.send('här är din kaka. userKey: ' + req.cookies['userTokenTESTtestTEST'])
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Error" });
//   }
// });
module.exports = router;
