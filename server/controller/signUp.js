const User = require('../model/userSchema');
const MailBox = require('../model/mailboxSchema');

let account = {};
const accountError = {};
const data = {};

module.exports =  signUpCtrl = (props, cb) => {
    // new Promise((resolve, reject) => {
    const { email, password, name } = props;
    const user = new User({ email, name });
    user.setPassword(password);
    user.save((err, user) => {
        if (!err) {
            account = {
                _id: user._id,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    created: user.created
                },
                created: user.created
            }

            const mailBox = new MailBox();
            const message = {
                from: 'account@mailbox.com',
                to: user.email,
                subject: 'Welcome to MailBag',
                body: `Dear ${user.name} welcome to MailBox application,
                        if you have any concern please contact our customer`,
            };
            mailBox.save((err, mailbox) => {
                user.mailbox = mailbox._id;
                user.save();
                if (!err) {
                    mailbox.inbox.push(message);
                    mailbox.save((err, _mailbox) => {
                        if (!err) {
                            account.mailbox = _mailbox;
                            // return signUpPayload object
                            // resolve();
                            cb({
                                successful: true,
                                account
                            })
                        }
                        cb({ successful: false, account: null });
                    });
                }
                 cb({ successful: false, account: null });
            });
        }
         cb({ successful: false, account: null });
    });
    // });
}