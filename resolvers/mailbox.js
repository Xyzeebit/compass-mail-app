const { GraphQLScalarType } = require('graphql');

const Account = require('../model/accountSchema');
const User = require('../model/userSchema');
const MailBox = require('../model/mailboxSchema');

const AccountController = require('../controller/account');
const signUpCtrl = require('../controller/signUp');

const { users, createMailBox } = require('./mock-data');
const mailbox = [];
var contacts = [];

const generateID = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}


module.exports = {
    Query: {
        account: async (_, args) => {
            const { id } = args;
            const accountPayload = { successful: false, error: { message: 'Unable to find account' } };
            const user = await User.findById(id);
            if (user) {
                const mailbox = await MailBox.findById(user.mailbox);
                if (mailbox) {
                    accountPayload.successful = true;
                    accountPayload.error = null;
                    accountPayload.account = {
                        _id: user._id,
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            contacts: user.contacts,
                            created: user.created
                        },
                        mailbox: {
                            ...mailbox,
                            mailboxTotal: {
                                ...totalDocuments(mailbox)
                            }
                        },
                        created: user.created
                    };
                    return accountPayload;
                }
            }
            return accountPayload;
        }
    }, // *********** End of Query

    Mutation: {
        signUp: async (_, args) => {
            const { name, email, password } = args.input;

            const user = new User({ name, email });
            user.setPassword(password);
            await user.save();

            const message = {
                from: 'account@mailbox.com',
                to: user.email,
                subject: 'Welcome to MailBag',
                body: `Dear ${user.name} welcome to MailBox application,
                        if you have any concern please contact our customer care`,
            };

            const mailbox = new MailBox();
            await mailbox.save();
            mailbox.inbox.push(message);
            await mailbox.save();
            user.mailbox = mailbox._id;
            await user.save();
            
            const newAccountPayload = (user._id !== undefined && mailbox._id !== undefined)
                ?
                    {
                        successful: true,
                        account: {
                            _id: user._id,
                            user: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                contacts: user.contacts,
                                created: user.created
                            },
                            mailbox: {
                                ...mailbox,
                                mailboxTotal: {
                                    ...totalDocuments(mailbox)
                                }
                            },
                            created: user.created
                        }
                    }
                :
                    {
                        successful: false
                    }
            return newAccountPayload;
           
        },
        signIn: async (_, args) => {
            const { email, password } = args;
            const user = await User.findOne({ 'email': email });
            if (!user.validPassword(password)) {
                return { successful: false, error: { message: 'Invalid email address or password'} };
            }
            const mailbox = await MailBox.findById(user.mailbox);
            const accountPayload = (user._id !== undefined && mailbox._id !== undefined)
                ?
                    {
                        successful: true,
                        account: {
                            _id: user._id,
                            user: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                contacts: user.contacts,
                                created: user.created
                            },
                            mailbox: mailbox,
                            created: user.created
                        }
                    }
                :
                    {
                        successful: false
                }
            return accountPayload;
        },
    
        signOut(_, args) {
            return { successful: true };
        },
        sendMessage: async (_, { input }) => {
            let outBoxPayload;
            const receiver = await User.findOne({ email: input.to });
            const sender = await User.findOne({ email: input.from });
            if (receiver && sender) {
                const receiversInbox = await MailBox.findById(receiver.mailbox);
                receiversInbox.inbox.push(input);
                await receiversInbox.save();

                const sendersOutbox = await MailBox.findById(sender.mailbox);
                sendersOutbox.outbox.push(input);
                await sendersOutbox.save();
                
                outBoxPayload = { successful: true };
                return outBoxPayload;
            }
            outBoxPayload = { successful: false };
            return outBoxPayload;
        },
        markMessage: async (_, { input }) => {
            const mailboxId = input.mailboxId !== undefined ? input.mailboxId : '';
            let messageId = input.messageId !== undefined ? input.messageId : '';

            const markedMessagePayload = {
                successful: false,
                message: null
            }
            if (messageId && mailboxId) {
                const result = await MailBox.findOne({ 'inbox._id': messageId });
                const message = result.inbox.id(messageId)
                let starred = false;
                let read = false;

                if (input.starred !== undefined && input.starred) {
                    if (!message.starred) {
                        message.starred = input.starred;
                        starred = true;
                    }
                }
                if (input.read !== undefined && input.read) {
                    if (!message.read) {
                        message.read = input.read;
                        read = true;
                    }
                }
                if (read || starred) {
                    console.log(message)
                    await result.save();
                    markedMessagePayload.successful = true;
                    markedMessagePayload.message = message;
                }
            }

            return markedMessagePayload;
        },
        removeMessage: async (_, { mailboxId, messageId, location }) => {
            const mail = await MailBox.findById(mailboxId);
            if (mail[location].id(messageId)) {
                mail[location].id(messageId).remove();
                await mail.save();
                return { successful: true };
            }
            return { successful: false };
        },
        saveToDrafts: async (_, { input }) => {
            const mailbox = await MailBox.findById(input.id);
            if (mailbox) {
                mailbox.drafts.push(input.message);
                await mailbox.save();
                return { successful: true };
            }
            return { successful: false };
        },
        addContact: async (_, args) => {
            const { userId, name, email } = args.input;
            const contactPayload = {
                successful: false,
                contact: null
            }
            const user = await User.findById(userId);
            if (user) {
                user.contacts.push({ name, email });
                await user.save();
                contactPayload.successful = true;
                contactPayload.contact = user.contacts.find(c => c.email === email);
            }
            return contactPayload;
        },
        editContact: async (_, args) => {
            const { userId, contactId, name, email } = args.input;
            const contactPayload = { successful: false };
            const user = await User.findById(userId);
            if (user) {
                const contact = user.contacts.id(contactId);
                if (name)
                    contact.name = name;
                if (email)
                    contact.email = email;
                await user.save();
                contactPayload.successful = true;
                contactPayload.contact = user.contacts.id(contactId);
            }
            return contactPayload;
        },
        removeContact: async (_, args) => {
            const user = await User.findById(args.userId);
            if (user) {
                if (user.contacts.id(args.contactId))
                    user.contacts.id(args.contactId).remove();
                await user.save();
                return { successful: true };
            }
            return { successful: false };
        },
        removeAccount: async (_, { id }) => {
            const user = await User.findByIdAndRemove(id);
            const mailbox = await MailBox.findByIdAndRemove(user.mailbox);
            if (user && mailbox) {
                return { successful: true };
            }
            return { successful: false };
        },
        editUser: async (_, { input }) => {
            const userPayload = { successful: false };
            
            if (input.userId !== undefined) {
                if (input.name !== undefined) {
                    const { name } = input;
                    const user = await User.findById(input.userId);
                    user.name = name;
                    await user.save();
                    userPayload.successful = true;
                    userPayload.user = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        contacts: user.contacts,
                        created: user.created
                    };
                    return userPayload;
                }
            }
            return userPayload;
        }
    }, // **************** End of Mutation

    // AccountPayload: {
    //     __resolveType(account, context, info) {
    //         if (account.user) {
    //             return 'User'
    //         }
    //         if (account.mailbox) {
    //             return 'MailBox'
    //         }
    //         return null;
    //     }
    // },
    // UserOrMailBox: {
    //     __resolveType(obj, context, info) {
    //         if (obj.name) {
    //             return 'User';
    //         }
    //         if (obj.inbox) {
    //             return 'MailBox';
    //         }
    //         return null;
    //     }
    // },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value.',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    }),
    
}

var totalDocuments = mailbox => {
    const total = {
        totalInbox: mailbox.inbox.length,
        totalOutbox: mailbox.outbox.length,
        totalSpam: mailbox.spam.length,
        totalTrash: mailbox.trash.length,
        totalDrafts: mailbox.drafts.length,
    }
    return total;
}