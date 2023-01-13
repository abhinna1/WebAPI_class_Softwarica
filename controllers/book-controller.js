const Book = require('../models/Book');

const getAllBooks = (req, res)=>{
    Book.find()
    .then((r)=>{
        res.json({'response': r});
    })
    .catch(err=>{res.send(err)});
}

const addBook = (req, res)=>{
    Book.create(req.body)
    .then(book=> res.status(201).json(book))
    .catch(e => res.send(e));
}

const deleteAllBooks = (req, res) => {
    Book.deleteMany()
    .then(reply => res.json({'response': reply}))
    .catch(err => console.log(err));
}

const getInvalidResponse = (req, res)=>{
    res.status(501).send({'response': "Non-functional URL."});
}


const getSingleBook = (req, res, next)=>{
    Book.findById(req.params.id)
    .populate('category')
    .then(r=>{res.send({'response': r})})
    .catch(err=>{next(err)});
}

const updateBook = (req, res)=>{
    Book.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(r=> res.send({'response': r}))
    .catch(e=>res.send(e));
}
        

module.exports = {
    'getAllBooks': getAllBooks,
    'addBook': addBook,
    'getInvalidResponse': getInvalidResponse,
    'deleteAllBooks': deleteAllBooks,
    'getSingleBook': getSingleBook,
    'updateBook': updateBook,
}