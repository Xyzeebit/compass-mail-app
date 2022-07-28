import { useEffect, useReducer } from 'react';
import Paginator from '../components/Paginator';
import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout';

import data from '../data';

export default function Inbox() {
    const [state, dispatch] = useReducer(combineReducers, initState);
  
    const { sidebar, contacts, mails, marked } = state;
    useEffect(() => {
      dispatch({ type: 'FETCH_MAIL', mails: data });
    }, []);
  
  return (
    <Layout sidebar={sidebar} contacts={contacts} dispatch={dispatch}>
      <section className="list">
        <List list={mails} marked={marked} dispatch={dispatch} />
        <Paginator />
      </section>
    </Layout>
  );
}

