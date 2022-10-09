import { useEffect, useReducer } from 'react';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

import { useQueryData } from '../hooks';
import { INBOX } from '../queries';

export default function Starred() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;

  const { loading, error, data } = useQueryData(INBOX, {
    variables: { username: user.username, page: 0 },
  }, 'inbox');
  
  const { inbox } = mails;
  
  useEffect(() => {
    document.title = 'Compass | Inbox'
  }, []);

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
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand}
        loading={loading}
        list={inbox}
        label="Your have no messages in your inbox"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

