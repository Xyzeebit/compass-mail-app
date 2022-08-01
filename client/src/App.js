import { useState } from 'react';
import './App.css';
import './styles/list.css';
// import {useQuery, gql} from '@apollo/client';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Outbox from './pages/Outbox';
import Starred from './pages/Starred';
import Drafts from './pages/Drafts';
import Trash from './pages/Trash';
import Spam from './pages/Spam';
import ComposePage from './pages/Compose';

//////////////////////////////

function App() {
 

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

        <Route path="/mail/compose" element={<ComposePage />} />
      </Routes>
    </Router>
  );
}
export default App;
