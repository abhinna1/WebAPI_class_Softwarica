

const Category = require('../models/Category');

const getAllCategories = (req, res, next)=>{
    Category.find()
    .then(e => {
        res.json({'response': e});
    })
    .catch(e=>res.stataus(404).send({'response': e}))
}

const createCategory = (req, res, next)=>{
    Category.create(req.body)
    .then(r=>{res.json({'response': r})})
    .catch(e=>{next(e)});
}

const deleteAllCategories = (req, res, next)=>{
    Category.deleteMany()
    .then(r=>{res.json({'response': r})})
    .catch(e=>{next(e)});
}

const getSingleCategory = (req, res, next)=>{
    Category.findById(req.params.id)
        .populate('category')
        .then(book => res.json({'response': book}))
        .catch(e=> next(e));
}

module.exports = {
    getAllCategories: getAllCategories,
    createCategory: createCategory,
    deleteAllCategories: deleteAllCategories,
    getSingleCategory: getSingleCategory
}