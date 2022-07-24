export const initState = {
    sidebar: {
        open: false
    }
}

function sidebarReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return { ...state, open: !state.open };
        default: return state;
    }
}

export default function combineReducers(state, action) {
    return {
        sidebar: sidebarReducer(state.sidebar, action)
    }
}