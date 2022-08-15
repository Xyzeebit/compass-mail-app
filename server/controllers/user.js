const MailBox = require('../models/mailboxSchema');
const User = require('../models/userSchema');
const { verify } = require('./auth');

async function getUser(args) {
    const payload = {};
    const { username, token } = args
    let decoded;
    try { 
        decoded = await verify(token);
        console.log(token)
    } catch (error) {
        payload.error = { name: 'JsonWebTokenError', message: 'jwt malformed' }
        payload.success = false;
        return payload
    }
    
    try { 
        const user = await User.findOne({ username: decoded.username });
        if (user) {
            payload.success = true;
            payload.user = {
                id: user._id,
                username,
                email: `${username}@compass.com`,
                created: user.created,
                firstName: user.firstName,
                lastName: user.lastName,
                contacts: user.contacts,
                mailId: user.mailbox
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

async function inbox(args) {
    const payload = {};
    const LIMIT = 20;
    try {
        const { me, page } = args;
        const box = await MailBox.find({ to: me })
            .where('trash').equals(false)
            .where('draft').equals(false)
            .where('spam').equals(false)
            .select('_id from to subject body time read')
            .limit(LIMIT).skip(LIMIT * page).sort({ time: 'asc' });
        if (box) {
            payload.success = true;
            payload.messages = box.map(i => {
                return {
                    id: i._id,
                    from: i.from,
                    to: i.to,
                    subject: i.subject,
                    body: i.body,
                    read: i.read,
                    time: i.time
                }
            });
            return payload;
        }
    } catch (error) {
        payload.success = false;
        payload.error = {
            name: error.code,
            message: error.message
        }
    }
}

module.exports = {
    getUser,
    inbox
}

