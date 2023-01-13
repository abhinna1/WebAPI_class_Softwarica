const express = require("express");
const Book = require("../models/Book.js");
// const Review = require('../models/Review.js');

const getAllReviews = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.json({ response: book.reviews });
    })
    .catch((e) => {
      next(e);
    });
};

const createReview = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      console.log(req.body);
      // next()

      book.reviews.push(req.body);
      book
        .save()
        .then((b) => {
          res.json({ response: b });
        })
        .catch((e) => {
          next(e);
        });
      // res.send({"response": book});
    })
    .catch((err) => next(err));
};

const updateReview = (req, res, next) => {};

const removeReview = (req, res, next) => {};

const getReviewById = (req, res, next) => {
  Book.findById(req.params.id)
    .then((b) => {
      // console.log(b);
      b.reviews.forEach((e) => {
        if (e.id === req.params.reviewid) {
          res.json({ response: e });
        }
      });
    })
    .catch((e) => {
      next(e);
    });
};

const updateReviewById = (req, res, next) => {
  Book.findById(req.params.id)
    .then((b) => {
      // console.log(b);
      b.reviews.forEach((e) => {
        if (e.id === req.params.reviewid) {
          e.body = req.body.body;
          b.save().then(res.json({ response: e }));
        }
      });
    })
    .catch((e) => {
      next(e);
    });
};

const deleteReviewById = (req, res, next) =>{
    Book.findById(req.params.id)
    .then(b=>{
        b.reviews.forEach(e=>{
            if(e.id === req.params.reviewid){
                e.delete();
            }
        })
    })
}

module.exports = {
  getAllReviews: getAllReviews,
  createReview: createReview,
  updateReview: updateReview,
  removeReview: removeReview,
  getReviewById: getReviewById,
  updateReviewById: updateReviewById,
  deleteReviewById: deleteReviewById,
};
