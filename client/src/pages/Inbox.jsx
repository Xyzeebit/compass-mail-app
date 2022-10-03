import { useState, useEffect, useReducer } from 'react';

// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

import { useQueryData } from '../hooks/fetch-data';

export default function Inbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;

  const { loading, error, data } = useQueryData({
    variables: { username: user.username, page: 0 },
  }, 'inbox');
  
  
  const { inbox } = mails;
  
  useEffect(() => {
    document.title = 'Compass | Inbox'
  }, []);

  useEffect(() => {

  })
  
  useEffect(() => {
    
    if (error) {
      dispatch({ type: 'FETCH_INBOX', inbox: [] });
    } else {
      if (data && data.success) {
        dispatch({ type: 'FETCH_INBOX', inbox: data.messages });
      }
    }
  }, [error, data]);

    
  return (
    <Layout sidebar={sidebar} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand}
        loading={loading}
        user={user} 
        list={inbox}
        label="Your have no messages in your inbox"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

