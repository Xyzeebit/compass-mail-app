import { useState, useEffect, useReducer } from 'react';
import { data } from '../data';

// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';
import { useQuery } from '@apollo/client';

import { INBOX } from '../queries';

export default function Inbox() {
  const [inbox, { loading, error, data }] = useQuery(INBOX);
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;
  // const { inbox } = mails;
  
  useEffect(() => {
    inbox({ variables: { username: 'donald', page: 10 } });
  }, [inbox]);
  
  useEffect(() => {
    
    if (error) {
      console.log(error)
      dispatch({ type: 'FETCH_INBOX', inbox: [] });
    } else {
      if (data && data.success) {
        // dispatch({ type: 'FETCH_INBOX', inbox: data.inbox. });
        console.log(data);
      }
    }
  }, [error, data]);

    
  return (
    <Layout sidebar={sidebar} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand}
        loading={loading}
        user={user} 
        list={[]}
        label="Your have no messages in your inbox"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

