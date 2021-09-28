const mongoose = require('mongoose');

/**
 * Mongoose Model for our MongoDB Collection
 * See:
 *  https://mongoosejs.com/docs/models.html
 *  https://docs.mongodb.com/manual/core/databases-and-collections/#collections
 */

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
      type: String,
      required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
