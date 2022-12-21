const generateID = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}



const userList = [
    {
        id: generateID(),
        name: 'John Doe',
        email: 'john@doe.com',
        contacts: [],
        created: new Date()
    },
    {
        id: generateID(),
        name: 'Donald Dominic',
        email: 'donald@mail.com',
        contacts: [],
        created: new Date()
    },
    {
        id: generateID(),
        name: 'Paul Huge',
        email: 'paulhuge@huge.com',
        contacts: [],
        created: new Date()
    },
    {
        id: generateID(),
        name: 'Tim Pane',
        email: 'tpane@pane.tp',
        contacts: [],
        created: new Date()
    },
    {
        id: generateID(),
        name: 'Peter Obin',
        email: 'obin@ptr.in',
        contacts: [],
        created: new Date()
    }
];

module.exports.users = userList;

const mailbox = {};

// module.exports.mailbox = 



const populateMailBox = field => {
    for (let i = 0; i < userList.length; i++) {
        mailbox[field] = {
            total: userList.length,
            messages: []
        }
        for (let n = 0; n < 5; n++) {
            mailbox[field].messages.push({
                id: generateID(),
                to: ((n + 1 < userList.length) ? userList[n + 1].email : userList[n].email),
                from: userList[n].email,
                forwardedBy: '',
                subject: 'GraphQL and REST data manipulation techniques',
                body: `This is a great learning material on introducing Graphql techniques
                    to new developers learning data manipulation for the first time.`,
                created: new Date()
            });
        }
    }
}

module.exports.createMailBox = function () {
    // mailbox['id'] = generateID();
    for (let i = 0; i < userList.length; i++) {
        const fields = ['inbox', 'outbox', 'drafts', 'trash', 'spam']
        populateMailBox(fields[i]);
    }
    const mail = [];
    for (let i = 0; i < 5; i++) {
        mail.push({ ...mailbox, id: userList[i].id });
    }
    return mail;
}
