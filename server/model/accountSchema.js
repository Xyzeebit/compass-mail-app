const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mailbox: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MailBox'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Account', accountSchema);