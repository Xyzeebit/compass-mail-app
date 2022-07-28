// import { useReducer } from 'react';
// import CombineReducers, { initState }

import Header from './Header';
import Contacts from './Contacts';
import SideBar from './SideBar'

export default function Layout({ sidebar, contacts, dispatch, children }) {
    return (
        <>
            <Header dispatch={dispatch}/>
            <main className="app">
                <SideBar sidebar={sidebar} dispatch={dispatch} />
                { children }
                <Contacts contacts={contacts} dispatch={dispatch} />
            </main>
        </>
    )
}