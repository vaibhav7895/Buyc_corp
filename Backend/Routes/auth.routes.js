const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, name, role } = req.body;
  try {
    if (!email || !pass || !name) {
      res.status(400).send({ msg: "Please enter email, password, and name" });
    } else {
      const user = await userModel.findOne({ email });
      if (user) {
        res.status(200).send({ msg: "User already registered" });
      } else {
        bcrypt.hash(pass, 5, async (err, hash) => {
          const newUser = await userModel({ email, pass: hash, name ,role});
          await newUser.save();
          res.status(200).send({ msg: "New user registered", user: req.body });
        });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// User Login
userRouter.post("/login", async (req, res) => {
  const { email, pass, role } = req.body;
  try {
    if (!email || !pass || !role) {
      res.status(400).send({ msg: "Please enter email and password" });
    } else {
      const user = await userModel.findOne({ email,role });
      if (user) {
        bcrypt.compare(pass, user.pass, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user._id, name: user.name, role: user.role }, "mock");
            res.status(200).send({ msg: "Login successful", token, user });
          } else {
            res.status(400).send({ msg: "Wrong credentials" });
          }
        });
      } else {
        res.status(400).send({ msg: "User not found" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
