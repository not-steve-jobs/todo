const express = require('express')
const router = express.Router()
const User = require('../controller/user')
const Todo = require('../controller/todo')
const auth = require('../middleware/auth.middleware')

//Users
router.post('/login',User.login)
router.post('/signup',User.signup)
router.get('/user/:id',auth,User.getOne)

//todo
router.post('/todo',auth,Todo.create)
router.delete('/todo/:id',auth,Todo.delete)
router.get('/todo',auth,Todo.getAllTodo)
router.put('/todo/:id',auth,Todo.edit)

router.get('/todo/:id',auth,Todo.getOne)
router.get('/myTodo',auth,Todo.getMyTodo)


module.exports = router;