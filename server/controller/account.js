const User = require('../model/userSchema');
const MailBox = require('../model/mailboxSchema');

class AccountController {
    account = {};
    accountError = {};
    data = {};

    async signUp(props) {
        const { email, password, name } = props;
        if (props) {
            const user = new User({ email, name });
            user.setPassword(password);
            await user.save((err, user) => {
                if (!err) {
                    this.account = {
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
                                    this.account.mailbox = _mailbox;

                                    // return signUpPayload object
                                    return {
                                        successful: true,
                                        account: this.account
                                    }
                                }
                                return { successful: false, account: null };
                            });
                        }
                        return { successful: false, account: null };
                    });
                }
                return { successful: false, account: null };
            });
        }
        // fail silently
    } // ########################## END OF SIGNUP FUNCTION

    signIn(email, password) {
        User.findOne({ 'email': email }, (err, user) => {
            if (!err) {
                
            }
        })
    }
}

module.exports = AccountController;