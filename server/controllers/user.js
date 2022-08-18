const MailBox = require('../models/mailboxSchema');
const User = require('../models/userSchema');
const { verify } = require('./auth');

async function getUser(args) {
    const payload = {};
    const { username, token } = args
    let decoded;
    
    try { 
        try {
          decoded = await verify(token);
        //   console.log(decoded)
        } catch (error) {
          payload.error = {
            name: error.name,
            message: error.message,
          };
          payload.success = false;
          return payload;
        }
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
        const { username, page } = args;
        const box = await MailBox.find({ to: username })
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

async function outbox(args) {
    const payload = {};
    const LIMIT = 20;
    try {
        const { username, page } = args;
        const box = await MailBox.find({ from: username })
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
        }
    } catch (error) {
        payload.success = false;
        payload.error = {
            name: 'RequestError',
            message: 'request error'
        }
    } finally {
        return payload;
    }
}

function drafts(args) {
    const payload = {};
    const LIMIT = 20;

    try {
        const { username, page } = args;
        const box = await MailBox.find({ from: username })
          .where("trash")
          .equals(false)
          .where("draft")
          .equals(true)
          .where("spam")
          .equals(false)
          .select("_id from to subject body time read")
          .limit(LIMIT)
          .skip(LIMIT * page)
          .sort({ time: "asc" });
        if (box) {
          payload.success = true;
          payload.messages = box.map((i) => {
            return {
              id: i._id,
              from: i.from,
              to: i.to,
              subject: i.subject,
              body: i.body,
              read: i.read,
              time: i.time,
            };
          });
        }
    } catch (error) {
        payload.success = false;
        payload.error = {
          name: "RequestError",
          message: "request error",
        };
    } finally {
        return payload;
    }
}

function spam(args) {
    const payload = {};
    const LIMIT = 20;
    try { 
        const { username, page } = args;
        const box = await MailBox.find({ to: username })
          .where("trash")
          .equals(false)
          .where("draft")
          .equals(false)
          .where("spam")
          .equals(true)
          .select("_id from to subject body time read")
          .limit(LIMIT)
          .skip(LIMIT * page)
          .sort({ time: "asc" });
        if (box) {
          payload.success = true;
          payload.messages = box.map((i) => {
            return {
              id: i._id,
              from: i.from,
              to: i.to,
              subject: i.subject,
              body: i.body,
              read: i.read,
              time: i.time,
            };
          });
        }
    } catch (error) {
        payload.success = false;
        payload.error = {
          name: "RequestError",
          message: "request error",
        };
    } finally {
        return payload;
    }
}

module.exports = {
    getUser,
    inbox,
    outbox,
    drafts,
    spam
}

