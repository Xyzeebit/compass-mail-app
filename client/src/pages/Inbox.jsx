import { useEffect, useReducer } from 'react';
import Paginator from '../components/Paginator';
import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout';

import { data, users } from '../data';

export default function Inbox() {
    const [state, dispatch] = useReducer(combineReducers, initState);
  
    const { sidebar, contacts, mails } = state;
    useEffect(() => {
      dispatch({ type: 'FETCH_MAIL', mails: data });
      dispatch({ type: 'FETCH_CONTACTS', contacts: users });
    }, []);
  
  return (
    <Layout sidebar={sidebar} contacts={contacts} dispatch={dispatch}>
      <section className="list">
        <List list={mails} label="Your inbox is empty" dispatch={dispatch} />
        <Paginator />
      </section>
    </Layout>
  );
}

