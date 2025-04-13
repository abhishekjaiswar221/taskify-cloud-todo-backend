import { Router } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/users-model.js";
import fetchUser from "../middleware/fetch-user.js";
import { body, validationResult } from "express-validator";

const router = Router();
const { genSalt, hash, compare } = bcryptjs;
const { sign } = jwt;

// ROUTE 1: Register or sign up a user using POST method "/api/auth/sign-up".No login required
router.post(
  "/sign-up",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    // body("username", "Enter a valid username").isLowercase({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success, error: error.array() });
    }

    //Check whether the user with this email exists already or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          Error: "Sorry a user with this email already exists",
        });
      }

      const salt = await genSalt(10);
      const secPass = await hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        // username: req.body.username,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      // console.log(user);
      const authToken = sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
      // res.json(user); // Return the created user
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2: Authenticate a user using POST method "/api/auth/sign-in".No login required
router.post(
  "/sign-in",
  [
    // body("username", "Enter a valid username").isLowercase({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      let comparePassword = await compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      let data = {
        user: {
          id: user.id,
        },
      };
      const authToken = sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Occurred");
    }
  }
);

// ROUTE 3: Get details of logged-in users using "/api/auth/get-user". Login required
router.post("/get-user", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ userId }).select("password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Occurred");
  }
});

export default router;
