const { Schema, model, ObjectId } = require("mongoose")

const Todo = new Schema({
  name: { type: String, required: true },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  description: { type: String },
  deadline: { type: Date, required: true },
  status: { type: Boolean, default: false }
})

module.exports = model('Todo', Todo)