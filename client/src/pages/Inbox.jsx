import { useState, useEffect, useReducer } from 'react';
import { data } from '../data';

// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

export default function Inbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;
  const { inbox } = mails;
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    dispatch({ type: 'FETCH_INBOX', inbox: data });
  }, []);

  useEffect(() => {
    if (inbox) {
      setLoading(false);
    }
  }, [inbox]);
    
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

