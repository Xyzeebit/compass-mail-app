import Layout from '../components/Layout-v2';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { messageQL } from '../queries';

import combineReducers, { initState } from "../reducer/reducer";

export default function Mail() {
    const [state, dispatch] = useReducer(combineReducers, initState);
    const { sidebar, user } = state;
  const params = useParams();
  const { loading, error, data } = useQuery(messageQL);

  useEffect(() => {
    document.title = 'Compass | Message'
  }, []);

  
  
    return (
      <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
        <p>{ params.slug }:{ params.id }</p>
      </Layout>
    );
}
