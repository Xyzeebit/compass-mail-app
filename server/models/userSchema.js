const mongoose = require('mongoose');
const crypto = require('crypto');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  }
});

const messagesSchema = new mongoose.Schema({
  messageId: mongoose.Schema.Types.ObjectId,
  inbox:{
    type: Boolean,
    default: false,
  },
  outbox: {
    type: Boolean,
    default: false,
  },
  spam: {
    type: Boolean,
    default: false,
  },
  draft: {
    type: Boolean,
    default: false,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  trash: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },

  salt: {
    type: String,
  },
  hash: {
    type: String,
  },
  contacts: [contactSchema],
  messages: {
    type: [messagesSchema]
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}
userSchema.methods.checkPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

module.exports = mongoose.model('User', userSchema);