// import { useState } from 'react';
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
import Auth from './pages/Auth';
import Mail from './pages/Mail';

//////////////////////////////

function App() {
 

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/mail" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/auth/signup" element={<Auth />} />

        <Route path="/auth/signin" element={<Auth />} />

        <Route path="/inbox" element={<Inbox />} />

        <Route path="/outbox" element={<Outbox />} />

        <Route path="/starred" element={<Starred />} />

        <Route path="/Drafts" element={<Drafts />} />

        <Route path="/trash" element={<Trash />} />

        <Route path="/spam" element={<Spam />} />

        <Route path="/compose" element={<ComposePage />} />

        <Route path='/:slug/:id' element={<Mail />} />
      </Routes>
    </Router>
  );
}
export default App;
