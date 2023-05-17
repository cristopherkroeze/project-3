const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const saltRounds = 10;

const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", (req, res, next) => {
  const { email, userName, password, name } = req.body;

  if (email === "" || userName === "" || password === "" || name === "") {
    res
      .status(400)
      .json({ message: "Provide email, username, password, and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  if (userName.length < 4) {
    res.status(400).json({ message: "Username must be at least 4 characters" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Email is taken" });
        return;
      }

      User.findOne({ userName }).then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ message: "Username is taken" });
          return;
        }
      });

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, userName, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, userName, name, _id } = createdUser;

      const user = { email, userName, name, _id };

      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/login", (req, res, next) => {
  const { userName, password } = req.body;

  if (userName === "" || password === "") {
    res.status(400).json({ message: "Provide userName and password." });
    return;
  }

  User.findOne({ userName })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, userName, name } = foundUser;

        const payload = { _id, userName, name };

        const authToken = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("req.user", req.user);

  res.status(200).json(req.user);
});

module.exports = router;
