import { useEffect, useReducer } from 'react';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

export default function Inbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user } = state;

  useEffect(() => {
    document.title = 'Compass | Inbox'
  }, []);

    
  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      {user && user.username ? <Mail 
        username={user.username}
        label={"inbox"}
        text="You have no messages in your inbox" 
      /> : <div />}
    </Layout>
  );
}

