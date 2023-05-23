const Router = require('express')
const router = Router()
const authMiddleWare = require('../middleware/auth.middleware')
const todoController = require('../controllers/todoController')

router.post('/createTodo', authMiddleWare, todoController.createTodo)
router.post('/getTodo', authMiddleWare, todoController.getTodos)
router.post('/deleteTodo', authMiddleWare, todoController.deleteTodo)
router.post('/updateTodo', authMiddleWare, todoController.updateTodo)
router.post('/today', authMiddleWare, todoController.today)

module.exports = router