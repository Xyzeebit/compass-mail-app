import data from './data';

export const initState = {
    sidebar: {
    open: true,
    },
    marked: [],
    mails: data
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
            state.push(action.id);
            return state;
        case 'UNMARK':
            const index = state.indexOf(action.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return state;
        case 'EMPTY_MARKED':
            state = [];
            return state;
        default: return state;
    }
}

function mailsReducer(state, action) {
    switch (action.type) {
        case 'FETCH':
            state = action.mails;
            return state;
        default: return state;
    }
}

export default function combineReducers(state, action) {
    return {
        sidebar: sidebarReducer(state.sidebar, action),
        marked: markedReducer(state.marked, action),
        mails: mailsReducer(state.mails, action)
    }
}