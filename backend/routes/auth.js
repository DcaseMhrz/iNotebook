const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "thisisajsontokensignature";

//ROUTE 1:create a user using: POST "/api/auth/createuser" :login not required
router.post(
  "/createuser",
  [
    body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
    body("password", "Password length not enough").isLength({ min: 5 }),
    body("email", "Invalid Email").isEmail(),
  ],
  async (req, res) => {
    let success = false
    // if there are error return badrequest and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether the user with the email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false
        return res.status(400).json({ error: "Sorry, user already exists" });
      }
      //hasing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new year
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      
      console.log(req.body);

      //user successfuly created
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
      //log in the logger

      //error in the code
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2 authenticate a user using: POST "/api/auth/login" :login not required
router.post(
  "/login",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      success = false
      let user = await User.findOne({ email });

      if (!user) {
        success = false
        return res.status(400).json({ errors: "Invalid Login" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ errors: "Invalid Login" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      //log in the logger

      //error in the code
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 Get loggedin User details: POST "/api/auth/getuser" : login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    //log in the logger

    //error in the code
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
