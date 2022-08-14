const MailBox = require('../models/mailboxSchema');
const User = require('../models/userSchema');
const { verify } = require('./auth');

async function getUser(args) {
    const payload = {};
    const { username, token } = args
    let decoded;
    try { 
        decoded = await verify(token);
    } catch (error) {
        payload.error{ name: 'JsonWebTokenError', message: 'jwt malformed' }
        payload.success = false;
        return payload
    }
    
    try { 
        const user = await User.findOne({ username: decoded.username });
        if (user) {
            payload.success = true;
            payload.user = {
                username,

            }
            return payload;
        }
        
    } catch (error) {
        payload.success = false;
        payload.error = {
            message: 'Cannot perform request',
            name: 'RequestError'
        }
        return payload;
    }
    
}

