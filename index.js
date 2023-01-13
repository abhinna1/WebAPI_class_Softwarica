require("dotenv").config();

const books_router = require("./routes/book-routes");
const category_router = require("./routes/category-routes");
const register = require("./routes/user-router");

const express = require("express");

const mongoose = require("mongoose");
const app = express();

// This is executed for all requests recieved in the express server.
// 1. Application level middleware.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

mongoose.set("strictQuery", true);
// Connect to MongoDB.
mongoose
  .connect("mongodb://127.0.0.1:27017/book_db")
  .then(() => {
    console.log("CONNECTEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    console.log("Connected to MongoDB database.");
  })
  .catch((e) => {
    console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log(e);
  });

// express.json() is a middleware used to decode JSON data.
app.use(express.json());

// 2. Router level middleware.
app.use("/books", books_router);
app.use("/category", category_router);
app.use("/user", register);

// Error Handeling route/middleware.
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(501).json({ response: err.message });
});

app.listen(3000, () => {
  console.log(process.env.SECRET)
  console.log("running in port 3000.");
});
