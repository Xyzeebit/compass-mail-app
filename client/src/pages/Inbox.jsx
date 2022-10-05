import { useState, useEffect, useReducer } from 'react';

// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

import { useQueryData, useUser } from '../hooks';
import { INBOX } from '../queries';

export default function Inbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;

  // const { loading, error, data } = useQueryData(INBOX, {
  //   variables: { username: 'xsmith', page: 0 },
  // }, 'inbox');

  const user1 = useUser();
  console.log(user1)
  
  const { inbox } = mails;
  
  useEffect(() => {
    document.title = 'Compass | Inbox'
  }, []);

  // useEffect(() => {

  // })
  
  // useEffect(() => {
    
  //   if (error) {
  //     dispatch({ type: 'FETCH_INBOX', inbox: [] });
  //   } else {
  //     if (data && data.success) {
  //       dispatch({ type: 'FETCH_INBOX', inbox: data.messages });
  //     }
  //   }
  // }, [error, data]);

    
  return (
    <Layout sidebar={sidebar} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand}
        loading={true}
        user={user} 
        list={[]}
        label="Your have no messages in your inbox"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

