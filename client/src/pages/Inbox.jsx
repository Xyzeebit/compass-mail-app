import { useState, useEffect, useReducer } from 'react';

// import List from '../components/List';

import combineReducers, { initState } from "../reducer/reducer";
import Layout from '../components/Layout-v2';
import Mail from '../components/Mail';

import { useQueryData, useUser } from '../hooks';
import { INBOX } from '../queries';

import { useNavigate } from 'react-router-dom';


export default function Inbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { sidebar, user, mails } = state;

  const { loading, error, data } = useQueryData(INBOX, {
    variables: { username: 'xsmith', page: 0 },
  }, 'inbox');

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

    const navigate = useNavigate();

  const usr = useUser(username, token);
  
  
  const { inbox } = mails;
  
  useEffect(() => {
    document.title = 'Compass | Inbox'
  }, []);

  useEffect(() => {
        let storage = localStorage.getItem('compass');
        if (storage) {
            storage = JSON.parse(storage);
            // setVariables({ username: storage.username, token: storage.token });
          setUsername(storage.username)
          setToken(storage.token);
            // refetch(variables);
        } else {
            navigate('/login');
        }
    }, []);

  console.log(usr)
  
  useEffect(() => {
    
    if (error) {
      dispatch({ type: 'FETCH_INBOX', inbox: [] });
    } else {
      if (data && data.success) {
        dispatch({ type: 'FETCH_INBOX', inbox: data.messages });
      }
    }
  }, [error, data]);

    
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

