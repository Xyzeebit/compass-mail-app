const MailBox = require('../models/mailboxSchema');
const User = require('../models/userSchema');
const { verify } = require('./auth');
const mongoose = require('mongoose');

async function getUser(args) {
    const payload = {};
    const { username, token } = args
    let decoded;
    try { 
        try {
          decoded = await verify(token);
          console.log(decoded)
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
                // messagesId: user.messages
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
            .select('_id from to subject body time')
            .limit(LIMIT).skip(LIMIT * page).sort({ time: 'asc' });
        const user = await User.findOne({ username });
        if (box && user) {
            payload.success = true;
            payload.messages = box.map(i => {
                const msg = user.messages.id(i._id);
                return {
                    id: i._id,
                    from: i.from,
                    to: i.to,
                    subject: i.subject,
                    body: i.body,
                    read: msg ? msg.read : false,
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
            .select('_id from to subject body time')
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

async function starred(args) {
    const payload = {};
    const LIMIT = 20;
    try {
        const { username, page } = args;
        const box = await MailBox.find({ to: username })
            .select('_id from to subject body time')
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
            .select("_id from to subject body time")
            .limit(LIMIT)
            .skip(LIMIT * page)
            .sort({ time: "asc" });
        const user = await User.findOne({ username });
        if (box) {
          payload.success = true;
            payload.messages = box.map((i) => {
                const msg = user.messages.id(i._id);
                if (msg.draft) {
                    return {
                      id: i._id,
                      from: i.from,
                      to: i.to,
                      subject: i.subject,
                      body: i.body,
                      time: i.time,
                    };
                }
              
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
            .select("_id from to subject body time")
            .limit(LIMIT)
            .skip(LIMIT * page)
            .sort({ time: "asc" });
        const user = await User.findOne({ username });
        if (box) {
          payload.success = true;
            payload.messages = box.map((i) => {
                const msg = user.messages.id(i._id);
                if (msg.spam) {
                    return {
                      id: i._id,
                      from: i.from,
                      to: i.to,
                      subject: i.subject,
                      body: i.body,
                      read: msg ? msg.read : false,
                      time: i.time,
                    };
                }
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
        .select("_id from to subject body time")
        .limit(LIMIT)
        .skip(LIMIT * page)
            .sort({ time: "asc" });
        const user = await User.findOne({ username });
    if (box) {
        payload.success = true;
        payload.messages = box.map((i) => {
            const msg = user.messages.id(i._id);
            if (msg.trash) {
                return {
                  id: i._id,
                  from: i.from,
                  to: i.to,
                  subject: i.subject,
                  body: i.body,
                  read: msg ? msg.read : false,
                  time: i.time,
                };
            }
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
                    console.log(mail)
                    user.messages.push({
                        messageId: mail._id,
                        outbox: true,
                        draft: false
                    });
                    receiver.messages.push({
                        messageId: mail._id,
                        inbox: true
                    });
                    await user.save();
                    await receiver.save();
                    payload.success = true;
                    payload.message = {
                        id: mail._id,
                        time: mail.time,
                        ...message,
                    }
                    
                } else {
                    payload.success = false;
                    payload.error = {
                        name: 'UserError',
                        message: 'cannot send message to user'
                    }
                }
            } else {
                payload.success = false;
                payload.error = {
                  name: "UserError",
                  message: "cannot send message to user",
                };
            }
        } else {
            const mail = new MailBox(message);
            const user = await User.findOne({ username: message.from });
            if(user) {
                await mail.save();
                user.messages.push({
                    messageId: mail._id,
                    draft: true
                });
                await user.save();
            } else {
                payload.success = false;
                payload.error = {
                  name: "UserError",
                  message: "cannot save message to draft",
                };
            }
        }
        
    } catch (error) {
        payload.success = false;
        payload.error = {
          name: "RequestError",
          message: "cannot perform request",
        };
    } finally {
        console.log('finally', payload)
        return payload;
    }
}

async function emptyTrash({ username }) {
    const payload = {};
    try {
        const user = await User.findOne({ username });
        if (user) {
            const ids = user.messages.map((msg) => {
                if (msg.trash) {
                    return msg._id;
                }
            })
            ids.map((id) => {
                user.messages.id(id).remove();
            });
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

async function addContact({ username, name, contactUsername }) {
    const payload = {};
    try {
        const user = await User.findOne({ username });
        if (user) {
            const id = mongoose.Schema.types.ObjectId;
            user.contacts.push({ _id: id, name, contactUsername });
            await user.save();
            payload.success = true;
            payload.contact = {
              id,
              name,
              contactUsername,
            };
        }
    } catch (error) {
        payload.success - false;
        payload.error = {
            name: 'RequestError',
            message: 'cannot perform operation'
        }
    }
}

async function removeContact({ username, contactId }) {
    const payload = {};
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.contacts.id(contactId).remove();
            await user.save();
        } else {
            payload.success = false;
            payload.error = {
              name: "UserError",
              message: "cannot perform operation",
            };
        }
    } catch (error) {
        payload.success = false;
        payload.error = {
            name: 'RequestError',
            message: 'cannot perform request'
        }
    }
}

async function message({ username, messageId }) {
    const payload = {};
    try {
        const mail = await MailBox.findById(messageId);
        if (mail) {
            payload.message = {
                id: mail._id,
                from: mail.from,
                to: mail.to,
                subject: mail.subject,
                body: mail.body,
                time: mail.time,
            }
            payload.success = true;
            
        }
        
    } catch (error) {
        payload.success = false;
        payload.error = {
          name: "RequestError",
          message: "cannot perform request",
        };
    } finally {
        return payload;
    }
}

module.exports = {
    getUser,
    inbox,
    outbox,
    starred,
    drafts,
    spam,
    trash,
    sendMessage,
    markAs,
    addContact,
    emptyTrash,
    removeContact,
    message,
}

