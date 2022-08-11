import { useEffect, useReducer } from 'react';
// import Paginator from '../components/Paginator';
// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';

export default function Inbox() {
    const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar } = state;
  return (
    <Layout sidebar={sidebar} dispatch={dispatch}>
    
    </Layout>
  );
}

