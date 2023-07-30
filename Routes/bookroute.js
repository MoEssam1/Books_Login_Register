const express = require('express')
const BookController=require('../Controllers/bookController')
const authorization=require('../middleware/auth')
const router=express.Router()

router.post('/books',authorization,BookController.addOneBook)
router.get('/books',authorization,BookController.getAllBooks)
router.get('/books/:id',authorization,BookController.getOneBook)
router.put('/books/:id',authorization,BookController.updateOneBook)
router.delete('/books/:id',authorization,BookController.deleteOneBook)
router.get('/books/autor/:autor',BookController.getAllBooksByAutor)

module.exports=router
