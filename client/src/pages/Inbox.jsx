import { useEffect, useReducer } from 'react';
import Paginator from '../components/Paginator';
import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout';

export default function Inbox() {
    const [state, dispatch] = useReducer(combineReducers, initState);
  
    const { sidebar, contacts, mails } = state;
  useEffect(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
    dispatch({ type: 'FETCH_MAIL' });
    dispatch({ type: 'FETCH_CONTACTS' })
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

