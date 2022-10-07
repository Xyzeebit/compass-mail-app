import { data, users } from '../data';

export const initState = {
    user: {
        from: {
            id: "ayuUIB780xui0",
            name: "Peters",
            email: "Peters@pt.com",
        },
        to: "",
        firstName: "John",
        lastName: "Smith",
        contacts: [
            {
                id: "jsjks87kHJJl",
                name: "John Smith",
                username: "xsmith",
                photo: "/avatar.png",
            },
            {
                id: "jsjksd87kHJJl",
                name: "John Smith",
                username: "xsmith",
                photo: "/avatar.png",
            },
            {
                id: "jsjks87kHJ3Jl",
                name: 'John Smith',
                username: 'xsmith',
                photo: '/avatar.png'
            },
            {
                id: "jhsjks87kbHJJl",
                name: 'John Smith',
                username: 'xsmith',
                photo: '/avatar.png'
            },
            {
                id: "jsjks87kHoJJl",
                name: 'John Smith',
                username: 'xsmith',
                photo: '/avatar.png'
            },
        ]
    },
    sidebar: {
        open: true,
        expand: false,
        flyout: false
    },
    contacts: {
        open: false,
        contacts: []
    },
    marked: [],
    mails: {

    },
};

function sidebarReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return { ...state, open: !state.open };
        case 'EXPAND':
            return { ...state, expand: !state.expand };
        case 'TOGGLE_CONTACTS':
            return { ...state, flyout: !state.flyout };
        default: return state;
    }
}

function markedReducer(state, action) {
    switch (action.type) {
        case 'MARK':
            const mark = state.find(i => i.id === action.id);
            if (mark) {
                const index = state.indexOf(mark);
                if (index !== -1) {
                  state.splice(index, 1);
                }
            } else {
                state.push({ location: action.location, id: action.id });
            }
            return state;
        
        default: return state;
    }
}

function mailsReducer(state, action) {
    switch (action.type) {
      
        case "FETCH_INBOX":
            if (action.inbox) {
                state.inbox = action.inbox.map(msg => {
                    return {
                        id: msg.id,
                        from: msg.from,
                        to: msg.to,
                        subject: msg.subject,
                        body: msg.body,
                        time: msg.time,
                        isNew: msg.read,
                        isMarked: false,
                        type: 'inbox'
                    }
                })
            } else {
                state.inbox = [];
            }
            return state;
      case "FETCH_OUTBOX":
        if (action.inbox) {
                state.inbox = action.inbox.map(msg => {
                    return {
                        id: msg.id,
                        from: msg.from,
                        to: msg.to,
                        subject: msg.subject,
                        body: msg.body,
                        time: msg.time,
                        isNew: msg.read,
                        isMarked: false,
                        type: 'outbox'
                    }
                })
            } else {
                state.inbox = [];
            }
            return state;
      case "FETCH_STARRED":
        if (action.inbox) {
                state.inbox = action.inbox.map(msg => {
                    return {
                        id: msg.id,
                        from: msg.from,
                        to: msg.to,
                        subject: msg.subject,
                        body: msg.body,
                        time: msg.time,
                        isNew: msg.read,
                        isMarked: false,
                        type: 'starred'
                    }
                })
            } else {
                state.inbox = [];
            }
            return state;
      case "FETCH_DRAFTS":
        state.drafts = action.drafts;
        return state;
      case "FETCH_SPAM":
        state.spam = action.spam;
        return state;
      case "FETCH_OUTBOX":
        state.trash = action.trash;
        return state;

      case "TOGGLE_MARK":
        const found = state.find((i) => i.id === action.id);
        if (found) {
          found.isMarked =
            found.isMarked === undefined ? true : !found.isMarked;
        }
        return state;
      case "EMPTY_MARKED":
        for (let mail of state) {
          if (mail.isMarked) {
            mail.isMarked = false;
          }
        }
        return state;
      case "DELETE_MARKED":
        state = state.filter(
          (i) => i.isMarked === undefined || i.isMarked !== true
        );
        return state;
      default:
        return state;
    }
}

function contactsReducer(state, action) {
    switch (action.type) {
        case 'FETCH_CONTACTS':
            state = { open: false, contacts: users };
            return state;
        case 'ADD_CONTACT':
            state.contacts.push({ id: Date.now(), name: action.contact.name, email: action.contact.email });
            return state;
        case 'SHOW_CONTACTS':
            state.open = true;
            return state;
        case 'CLOSE_CONTACTS':
            state.open = false;
            return state;
        default:
            return state;
    }
}

function userReducer(state, action) {
    switch (action.type) {
        case 'FETCH_USER':
            if (action.user) {
                state = action.user;
            }
            return state;
        case 'TO':
            state.to = action.to;
            return state;
        default: return state;
    }
}

export default function combineReducers(state, action) {
    return {
        sidebar: sidebarReducer(state.sidebar, action),
        marked: markedReducer(state.marked, action),
        mails: mailsReducer(state.mails, action),
        contacts: contactsReducer(state.contacts, action),
        user: userReducer(state.user, action),
    }
}