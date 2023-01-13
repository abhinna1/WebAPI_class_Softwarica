const express = require('express');

const router = express.Router();

const controller = require('../controllers/book-controller');
const review_controller = require('../controllers/reviews-controller');

router.route('/')
    .get(controller.getAllBooks)
    .post(controller.addBook)
    .put(controller.getInvalidResponse)
    .delete(controller.deleteAllBooks)

router.route('/:id')
    .get(controller.getSingleBook)
    .post(controller.getInvalidResponse)
    .put(controller.updateBook)

router.route('/:id/reviews/')
    .get(review_controller.getAllReviews)
    .post(review_controller.createReview)
    .put(review_controller.updateReview)
    .delete(review_controller.removeReview)

router.route('/:id/reviews/:reviewid')
    .get(review_controller.getReviewById)
    .put(review_controller.updateReviewById)
    .delete(review_controller.deleteReviewById)

    // .delete(controller.deleteSingleBook)
module.exports = router;