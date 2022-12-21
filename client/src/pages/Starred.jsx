import { useEffect, useReducer } from 'react';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

export default function Starred() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user } = state;

  useEffect(() => {
    document.title = 'Compass | Starred'
  }, []);

  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      {user && user.username ? <Mail
        username={user.username}
        label={"starred"}
        text="You have no starred messages"
      /> : <div />}
    </Layout>
  );
}

