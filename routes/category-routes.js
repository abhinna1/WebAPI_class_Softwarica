express = require('express');

const controller = require('../controllers/category-controller');
const router = express.Router();

router.route('/')
    .post(controller.createCategory)
    .get(controller.getAllCategories)
    .put((re, res) => res.status(501).json({'response': "Nothing here."}))
    .delete(controller.deleteAllCategories)
    

router.route('/:category_id')
    .get(controller.getSingleCategory)
    .post((req, res) => res.status(501).json({'response': "Nothing here."}))
    .put()
    .delete()




module.exports = router