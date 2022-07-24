import { useState } from 'react';
import './App.css';
// import {useQuery, gql} from '@apollo/client';

import { useReducer } from 'react';

// import Header from './Header';
// import SideBar from './SideBar';
import Compose from './Compose';
import MessageList, { Message } from './MessageList';
//////////////////////////////

import SideBar from './components/SideBar';
import Header from './components/Header';
import combineReducers, { initState } from './reducer/reducer';

//////////////////////////////

function App() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const [composeVisible, setComposeVisible] = useState(false);
  const handleCompose = e => {
    setComposeVisible(true);
    alert(composeVisible)
  }

  return (
    <div>
      <Header dispatch={dispatch} />
      <div className="app">
        <SideBar sidebar={state.sidebar} dispatch={dispatch} handleCompose={handleCompose} />
        <MessageList />
      </div>
      {/* <Compose visible={composeVisible} /> */}
      
      {/* <Message /> */}
    </div>
  )
}
export default App;
