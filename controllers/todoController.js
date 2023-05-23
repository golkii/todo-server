const User = require('../models/User')
const Folder = require('../models/Folder')
const Todo = require('../models/Todo')

class TodoController {
  async createTodo(req, res) {
    try {
      const { name, folder, description, deadline, status } = req.body
      const todo = new Todo({ name, folder, description, deadline, status })

      await todo.save()

      return res.json(todo)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async getTodos(req, res) {
    try {
      const { folder } = req.body
      const todos = await Todo.find({ folder: folder })
      return res.json({ todos })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Can not get todos" })
    }
  }

  async today(req, res) {
    try {
      const { deadline } = req.body
      const folders = await Folder.find({ user: req.user.id })
      const todos = (await Promise.all(folders.map(async el => await Todo.find({ folder: el._id, deadline: deadline })))).flat()
      return res.json({ todos })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Can not get todos" })
    }
  }

  async deleteTodo(req, res) {
    try {
      const todo = await Todo.findOne({ _id: req.body.id })
      if (!todo) { return res.status(400).json({ message: 'Todo not found' }) }
      await Todo.deleteOne({ _id: todo._id })
      return res.json({ message: 'Todo was deleted' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "Delete todo error" })
    }
  }

  async updateTodo(req, res) {
    try {
      const todo = await Todo.findOne({ _id: req.body.id })
      //console.log(todo)
      if (!todo) { return res.status(400).json({ message: 'Todo not found' }) }
      await Todo.updateOne({ _id: todo._id }, {
        name: req.body.name,
        deadline: req.body.deadline,
        description: req.body.description,
        status: req.body.status
      })
      const newTodo = await Todo.findOne({ _id: req.body.id })
      //console.log(newTodo)
      return res.json({ newTodo })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "Update todo error" })
    }
  }
}

module.exports = new TodoController()