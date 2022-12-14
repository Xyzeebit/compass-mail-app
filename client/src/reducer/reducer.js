import { data, users } from '../data';

export const initState = {
    user: {
        
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
            if (action.outbox) {
                state.outbox = action.outbox.map(msg => {
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
                state.outbox = [];
            }
            return state;
      case "FETCH_STARRED":
            if (action.starred) {
                state.starred = action.starred.map(msg => {
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
                state.starred = [];
            }
            return state;
      case "FETCH_DRAFTS":
        if (action.drafts) {
                state.drafts = action.drafts.map(msg => {
                    return {
                        id: msg.id,
                        from: msg.from,
                        to: msg.to,
                        subject: msg.subject,
                        body: msg.body,
                        time: msg.time,
                        isNew: msg.read,
                        isMarked: false,
                        type: 'drafts'
                    }
                })
            } else {
                state.drafts = [];
            }
            return state;
      case "FETCH_SPAM":
            if (action.spam) {
                state.spam = action.spam.map(msg => {
                    return {
                        id: msg.id,
                        from: msg.from,
                        to: msg.to,
                        subject: msg.subject,
                        body: msg.body,
                        time: msg.time,
                        isNew: msg.read,
                        isMarked: false,
                        type: 'spam'
                    }
                })
            } else {
                state.spam = [];
            }
            return state;
      case "FETCH_TRASH":
            if (action.trash) {
                state.trash = action.trash.map(msg => {
                    return {
                        id: msg.id,
                        from: msg.from,
                        to: msg.to,
                        subject: msg.subject,
                        body: msg.body,
                        time: msg.time,
                        isNew: msg.read,
                        isMarked: false,
                        type: 'trash'
                    }
                })
            } else {
                state.trash = [];
            }
            return state;

      case "TOGGLE_MARK":
        const found = state[action.label].find((i) => i.id === action.id);
        if (found) {
          found.isMarked =
            found.isMarked === undefined ? true : !found.isMarked;
        }
        return state;
      case "EMPTY_MARKED":
        for (let mail of state[action.label]) {
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