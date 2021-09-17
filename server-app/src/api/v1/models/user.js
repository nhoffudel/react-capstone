const mongoose = require('mongoose');

/**
 * Mongoose Model for our MongoDB Collection
 * See:
 *  https://mongoosejs.com/docs/models.html
 *  https://docs.mongodb.com/manual/core/databases-and-collections/#collections
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // This prevents duplicate documents w/the exact same info from being created for this model.
    unique: true,
    required: true,
  },
  password: {
      type: String,
      required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
