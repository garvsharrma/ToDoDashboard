const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);
