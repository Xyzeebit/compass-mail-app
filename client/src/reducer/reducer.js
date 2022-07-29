import data from '../data';

export const initState = {
    sidebar: {
    open: true,
    },
    contacts: [],
    marked: [],
    mails: [],
};

function sidebarReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return { ...state, open: !state.open };
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
        // case 'EMPTY_MARKED':
        //     state = [];
        //     return state;
        default: return state;
    }
}

function mailsReducer(state, action) {
    switch (action.type) {
        case 'FETCH_MAIL':
            const mails = action.mails
            // for (let mail of mails) {
            //     mail.isMarked = false;
            // }
            state = mails;
            return state;
        case 'TOGGLE_MARK':
            const found = state.find(i => i.id === action.id);
            if (found) {
                found.isMarked = found.isMarked === undefined ? true : !found.isMarked;
            }
            return state;
        case 'EMPTY_MARKED':
            for (let mail of state) {
                if (mail.isMarked) {
                    mail.isMarked = false;
                }
            }
            return state;
        case 'DELETE_MARKED':
            state = state.filter(i => (i.isMarked === undefined || i.isMarked !== true));
            return state;
        default: return state;
    }
}

function contactsReducer(state, action) {
    switch (action.type) {
        case 'FETCH_CONTACTS':
            state = action.contacts;
            return state;
        case 'ADD_CONTACT':
            state.push({ id: Date.now(), name: action.contact.name, email: action.contact.email });
            return state;
        default:
            return state;
    }
}

export default function combineReducers(state, action) {
    return {
        sidebar: sidebarReducer(state.sidebar, action),
        marked: markedReducer(state.marked, action),
        mails: mailsReducer(state.mails, action),
        contacts: contactsReducer(state.contacts, action),
    }
}