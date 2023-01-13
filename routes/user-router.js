const express = require("express");
const User = require("../models/User");
const bycrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  console.log("Registering");
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        let err = new Error(
          `Username ${req.body.username} is allreday existed`
        );
        return next(err);
      }
      bycrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        user = new User();
        user.username = req.body.username;
        user.password = hash;
        user.save().then((user) => {
          res.status(201).json({
            response: {
              statue: "user register successfully",
              userId: user._id,
              username: user.username,
            },
          });
        });
      });
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((User) => {
      if (User == null) {
        let err = new Error("user is not registered.");
      }
      bycrypt.compare(req.body.password, User.password, (err, success) => {
        if (err) returnnext(err);

        if (!success) {
          let err = new Error("Password doesnot match");
          return next(err);
        }
        let data = {
          userId: User._id,
          username: User.username,
        };
        jwt.sign(
          data,
          process.env.SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) return next(err);

            res.json({
              status: "logiin  successful",
              token: token,
            });
          }
        );
      });
    })
    .catch(next);
});

module.exports = router;
