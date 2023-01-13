const books = require('../data/books');

const getAllBooks = (req, res)=>{
    res.json({'content': books});
}

const addBook = (req, res)=>{
    let _newbook = {
        'id': books[books.length-1].id + 1,
        'title': req.body.title,
        'author': req.body.author,
    };
    books.push(_newbook);
    res.status(201);
    res.json({'content': _newbook});
}

const deleteBook = (req, res)=>{
    books = [];
    res.json({'content': books});
};

const getInvalidResponse = (req, res)=>{
    res.status(501).json({'content': "No Data Here."});
}

// URL params controllers.

const getSingleBook = (req, res)=>{
    const book = books.find((item)=>{
        return item.id == req.params.id;
    });
    res.json({'content': book});
}

const updateBook = (req, res)=>{
    let _updatedbooks = books.map(e=>{
        console.log(req.params)
        
        e.title = req.params.title;
        e.author = req.params.author;
        
        return e;
    })

    res.send({'content': _updatedbooks});
}

const deleteSingleBook = (req, res)=>{
    const _newbooks = books.filter(book=> book.id!=req.params.id);
    books = _newbooks;
    res.send({'content': books});
}


module.exports = {
    'getAllBooks': getAllBooks,
    'addBook': addBook,
    'getInvalidResponse': getInvalidResponse,
    'deleteBook': deleteBook,
    'getSingleBook': getSingleBook,
    'updateBook': updateBook,
    'deleteSingleBook': deleteSingleBook,
}


