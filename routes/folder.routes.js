const Router = require('express')
const router = Router()
const authMiddleWare = require('../middleware/auth.middleware')
const folderController = require('../controllers/folderController')

router.post('', authMiddleWare, folderController.createFolder)
router.get('', authMiddleWare, folderController.fetFolders)
router.delete('', authMiddleWare, folderController.deleteFolder)
router.post('/update', authMiddleWare, folderController.updateFolder)

module.exports = router