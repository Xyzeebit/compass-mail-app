import Layout from '../components/Layout-v2';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useMessage } from '../hooks';
import combineReducers, { initState } from "../reducer/reducer";

export default function Mail() {
    const [state, dispatch] = useReducer(combineReducers, initState);
    const { sidebar, user } = state;
  const params = useParams();
  const data = useMessage(user.username, params.id);
  console.log(data)
  useEffect(() => {
    document.title = 'Compass | Message'
  }, []);


  
    return (
      <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
        <p>{ params.slug }:{ params.id }</p>
      </Layout>
    );
}
