const express = require("express");
const User = require("../Models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "947514abcd";
const fetchuser = require("../middleware/fetchuser");
let success=false
//ROUTE 1: FOR USER_CREATION   api/user/create_user
router.post(
  "/create_user",
  [
    //VALIDATION
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //CHECK IF VALIDATION ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      //CHECK IF EMAIL ALREADY EXISTS
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        success=false
        return res
          .status(400)
          .json({ success,errors: [{ msg: "Email address already in use" }] });
      }

      //USER CREATION
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          user: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      console.log(token);
      console.log("account created");
      success=true
      res.json({ success,token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE 2: Authenticate user to login       api/user/login
router.post(
  "/login",
  [
    //VALIDATION

    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //CHECK IF VALIDATION ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({ success,errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false

        return res
          .status(400)
          .json({ success,error: "Please login with correct credentials" });
      }

      const comaparePass = await bcrypt.compare(password, user.password);
      if (!comaparePass) {
        success=false

        return res.status(400).json({ success,error: "Wrong Password! Try Again" });
      }

      const data = {
        user: {
          user: user.id,
        },
      };
      success=true
      const token = jwt.sign(data, JWT_SECRET);
      console.log(success,token);
      res.json({ success,token });
    } catch (error) {
      console.error(error.message);
      success=false

      return res.status(500).send(success,"Iternal Server Error!");
    }
  }
);

//ROUTE 3: logged in user detail  /api/user/getuser

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.user;
    console.log("id", userid);

    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Iternal Server Error!");
  }
});
module.exports = router;
