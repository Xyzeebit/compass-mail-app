import { useEffect, useReducer } from 'react';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

export default function Outbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user } = state;
  
  useEffect(() => {
    document.title = 'Compass | Outbox'
  }, []);

  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      <Mail 
        username={user.username}
        label="outbox"
        text="Your have no messages in your outbox"
      />
    </Layout>
  );
}

