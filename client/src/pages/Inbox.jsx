import { useEffect, useReducer } from 'react';
import Paginator from '../components/Paginator';
import List from '../components/List';

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import combineReducers, { initState } from "../reducer/reducer";

export default function Inbox() {
    const [state, dispatch] = useReducer(combineReducers, initState);
  
    const { mails } = state;
    useEffect(() => {

    }, []);
    return (
      <main>
        <Header dispatch={dispatch} />
        <div className="app">
          <SideBar sidebar={state.sidebar} dispatch={dispatch} />
          <section className="list">
            <List list={mails} dispatch={dispatch} />
            <Paginator />
          </section>
        </div>
      </main>
    );
}

