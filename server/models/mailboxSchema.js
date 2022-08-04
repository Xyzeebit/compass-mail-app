const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: String,
    forwardedBy: String,
    created: {
        type: Date,
        default: Date.now()
    },
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
    }
});

const mailboxSchema = new mongoose.Schema({
    inbox: [messageSchema],
    outbox: [messageSchema],
    drafts: [messageSchema],
    starred: [messageSchema],
    spam: [messageSchema],
    trash: [messageSchema],
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('MailBox', mailboxSchema);