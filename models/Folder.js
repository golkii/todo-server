const { Schema, model, ObjectId } = require("mongoose")

const Folder = new Schema({
  name: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Folder', Folder)