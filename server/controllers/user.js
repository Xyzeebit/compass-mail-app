const MailBox = require('../models/mailboxSchema');
const User = require('../models/userSchema');
const { verify } = require('./auth');

async function getUser(args) {
    const payload = {};
    const { username, token } = args
    try { } catch (error) {
        payload.success = false;
        payload.error = {
            message: 'Cannot perform request',
            name: 'RequestError'
        }
        return payload;
    }
    
}

