import { useEffect, useReducer } from 'react';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

import { useQueryData } from '../hooks';
import { STARRED } from '../queries';

export default function Starred() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;

  const { loading, error, data } = useQueryData(STARRED, {
    variables: { username: user.username, page: 0 },
  }, 'starred');
  
  const { starred } = mails;
  
  useEffect(() => {
    document.title = 'Compass | Starred'
  }, []);

  useEffect(() => {
    
    if (error) {
      dispatch({ type: 'FETCH_STARRED', starred: [] });
    } else {
      if (data && data.success) {
        dispatch({ type: 'FETCH_INBOX', starred: data.messages });
      }
    }
  }, [error, data]);

    
  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand}
        loading={loading}
        list={starred}
        label="Your have no starred messages"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

