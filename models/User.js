const { Schema, model, ObjectId } = require("mongoose")

const User = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  setting: { type: Schema.Types.ObjectId, ref: 'Setting' }
})

module.exports = model('User', User)