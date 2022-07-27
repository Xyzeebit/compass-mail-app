import { useState } from 'react';
import './App.css';
// import {useQuery, gql} from '@apollo/client';

import { useReducer } from 'react';

// import Header from './Header';
// import SideBar from './SideBar';
import Compose from './Compose';
import MessageList, { Message } from './MessageList';
//////////////////////////////
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Header from './components/Header';
import combineReducers, { initState } from './reducer/reducer';
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Outbox from './pages/Outbox';
import Starred from './pages/Starred';
import Drafts from './pages/Drafts';
import Trash from './pages/Trash';
import Spam from './pages/Spam';

//////////////////////////////

function App() {
  const [state, dispatch] = useReducer(combineReducers, initState);
  const [composeVisible, setComposeVisible] = useState(false);
  const handleCompose = e => {
    setComposeVisible(true);
    alert(composeVisible)
  }

  return (
    <Router>
      {/* <div>
        <Header dispatch={dispatch} />
        <div className="app">
          <SideBar
            sidebar={state.sidebar}
            dispatch={dispatch}
            handleCompose={handleCompose}
          />
          <MessageList />
        </div>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/mail" element={<Home />} />

        <Route path="/mail/inbox" element={<Inbox />} />

        <Route path="/mail/outbox" element={<Outbox />} />

        <Route path="/mail/starred" element={<Starred />} />

        <Route path="/mail/Drafts" element={<Drafts />} />

        <Route path="/mail/trash" element={<Trash />} />

        <Route path="/mail/spam" element={<Spam />} />
      </Routes>
    </Router>
  );
}
export default App;
