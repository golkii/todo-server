const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const router = new Router()
const authMiddleWare = require('../middleware/auth.middleware')

router.post('/registration',
  [
    check('login', "Uncorrect login").isLength({ min: 3 }),
    check('password', "Password must be longer than 6").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors })
      }

      const { login, password } = req.body
      const candidate = await User.findOne({ login })

      if (candidate) {
        return res.status(400).json({ message: `User with login ${login} already exist` })
      }

      const hashPassword = await bcrypt.hash(password, 8)
      const user = new User({ login, password: hashPassword })
      await user.save()
      return res.json({ message: "User was created" })

    } catch (error) {
      console.log(error)
      res.send({ message: "Server error" })
    }
  })

router.post('/login',
  async (req, res) => {
    try {

      const { login, password } = req.body
      const user = await User.findOne({ login })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const isPassValid = bcrypt.compareSync(password, user.password)
      if (!isPassValid) {
        return res.status(400).json({ message: "Invalid password" })
      }
      const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
      return res.json({
        token,
        user: {
          id: user.id,
          login: user.login,
          setting: user.setting
        }
      })

    } catch (error) {
      console.log(error)
      res.send({ message: "Server error" })
    }
  })

router.get('/auth', authMiddleWare,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id })

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
      return res.json({
        token,
        user: {
          id: user.id,
          login: user.login,
          setting: user.setting
        }
      })

    } catch (error) {
      console.log(error)
      res.send({ message: "Server error" })
    }
  })

module.exports = router