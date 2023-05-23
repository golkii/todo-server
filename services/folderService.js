const fs = require('fs')
const Folder = require('../models/Folder')

class FolderService {
  createDir(folder) {
    return new Promise(((resolve, reject) => {
      try {

      } catch (error) {
        return reject({ message: 'Folder error' })
      }
    }))
  }
}