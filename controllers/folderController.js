//const User = require('../models/User')
const Folder = require('../models/Folder')
//const Todo = require('../models/Todo')

class FolderController {
  async createFolder(req, res) {
    try {
      console.log(req.body)
      const { name } = req.body
      const folder = new Folder({ name, user: req.user.id })

      await folder.save()
      return res.json(folder)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async fetFolders(req, res) {
    try {
      const folders = await Folder.find({ user: req.user.id })
      return res.json({ folders })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Can not get folders" })
    }
  }

  async deleteFolder(req, res) {
    try {
      const folder = await Folder.findOne({ _id: req.query.id })
      if (!folder) { return res.status(400).json({ message: 'Folder not found' }) }
      await Folder.deleteOne({ _id: folder._id })
      return res.json({ message: 'Folder was deleted' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Folder delete error' })
    }
  }

  async updateFolder(req, res) {
    try {
      const folder = await Folder.findOne({ _id: req.body.id })
      if (!folder) { return res.status(400).json({ message: 'Folder not found' }) }
      await Folder.updateOne({ _id: folder._id }, { name: req.body.name })
      const newFolder = await Folder.findOne({ _id: req.body.id })
      return res.json({ newFolder })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Folder update error' })
    }
  }
}

module.exports = new FolderController()