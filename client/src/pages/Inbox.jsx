import { useEffect, useReducer } from 'react';
// import Paginator from '../components/Paginator';
// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

export default function Inbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;
  
  useEffect(() => {
    dispatch({ type: 'FETCH_MAIL'});
  }, []);
    
  return (
    <Layout sidebar={sidebar} dispatch={dispatch}>
      <Mail 
        expand={sidebar.expand} 
        user={user} 
        list={mails}
        label="Your have no messages in your inbox"
        dispatch={dispatch} 
      />
    </Layout>
  );
}

