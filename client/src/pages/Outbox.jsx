import { useEffect, useReducer } from 'react';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

import { useQueryData } from '../hooks';
import { OUTBOX } from '../queries';

export default function Outbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;

  const { loading, error, data } = useQueryData(OUTBOX, {
    variables: { username: user.username, page: 0 },
  }, 'outbox');
  
  const { outbox } = mails;
  
  useEffect(() => {
    document.title = 'Compass | Outbox'
  }, []);

  useEffect(() => {
    
    if (error) {
      dispatch({ type: 'FETCH_OUTBOX', outbox: [] });
    } else {
      if (data && data.success) {
        dispatch({ type: 'FETCH_OUTBOX', outbox: data.messages });
      }
    }
  }, [error, data]);

    
  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand}
        loading={loading}
        list={outbox}
        label="Your have no messages in your inbox"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

