const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: String,
    forwardedBy: String,
    subject: {
        type: String,
        required: true
    },
    body: String,
    starred: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: Data.now()
    },
});

const mailboxSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: String,
    forwardedBy: String,
    subject: {
        type: String,
        required: true,
    },
    body: String,
    starred: {
        type: Boolean,
        default: false,
    },
    draft: {
        type: Boolean,
        default: false,
    },
    spam: {
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
    time: {
        type: Date,
        default: Data.now(),
    },
});

module.exports = mongoose.model('MailBox', mailboxSchema);