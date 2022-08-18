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
                messageId: user.messages
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

async function drafts(args) {
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

async function spam(args) {
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

async function trash(args) {
    
    const payload = {};
    const LIMIT = 20;
    try {
    const { username, page } = args;
    const box = await MailBox.find({ to: username })
        .where("trash")
        .equals(true)
        .where("draft")
        .equals(false)
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

async function markAs(args) {
    const payload = {};
    try { 
        const { username, messageId, mark } = args;
        const user = await User.findOne({ username });
        const message = user.messages.id(messageId);
        message[mark] = true;
        await user.save();
        // switch (mark) {
        //     case "draft":
        //         if (message) {
        //             message.draft = true;
        //             payload.success = true;
        //             await user.save();
        //         }
        //         break;
        //     case "starred":
        //         if (message) {
        //             message.starred = true;
        //             payload.success = true;
        //             await user.save();
        //         }
        //         break;
        //     case "read":
        //         if (message) {
        //             message.read = true;
        //             payload.success = true;
        //             await user.save();
        //         }
        //         break;
        //     case "spam":
        //         if (message) {
        //             message.spam = true;
        //             payload.success = true;
        //             await user.save();
        //         }
        //         break;
        //     case "trash":
        //         if (message) {
        //             message.trash = true;
        //             payload.success = true;
        //             await user.save();
        //         }
        //         break;
        //     default:
        //         payload.success = false;
        // }
    } catch (error) {
        payload.success = false;
        return payload;
    } finally { 
        return payload;
    }
}

async function sendMessage(message) {
    const payload = {};
    try {
        if (message.to) {
            const receiver = await User.findOne({ username: message.to });
            if (receiver) {
                const user = await User.findOne({ username: message.from });
                if (user) {
                    const mail = new MailBox(message);
                    await mail.save();
                    user.messages.push({
                        messageId: mail._id,
                        outbox: true,
                        draft: false
                    });
                    receiver.message.push({
                        messageId: mail._id,
                        inbox: true
                    });
                    await user.save();
                    await receiver.save();
                } else {
                    payload.success = false;
                }
            } else {
                payload.success = false;
            }
        } else {
            const mail = new MailBox(message);
            const user = await User.findOne({ username: message.from });
            if(user) {
                await mail.save();
                user.message.push({
                    messageId: mail._id,
                    draft: true
                });
                await user.save();
            }
        }
        
    } catch (error) {
        payload.success = false;
    } finally {
        return payload;
    }
}

async function deleteMessage({ username, messageId }) {
    const payload = {};
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.messages.id(messageId).remove();
            await user.save();
            payload.success = true;
        } else {
            payload.success = false;
        }
    } catch (error) {
        payload.success = false;
    } finally {
        return payload;
    }
}

module.exports = {
    getUser,
    inbox,
    outbox,
    drafts,
    spam,
    trash,
    sendMessage,
    deleteMessage,
    markAs,
}

