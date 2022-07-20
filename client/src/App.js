import { useState } from 'react';
import './App.css';
// import {useQuery, gql} from '@apollo/client';

import Header from './Header';
import SideBar from './SideBar';
import Compose from './Compose';
import MessageList, {Message} from './MessageList';

function App() {
  const [composeVisible, setComposeVisible] = useState(false);
  const handleCompose = e => {
    setComposeVisible(true);
    alert(composeVisible)
  }

  return (
    <div>
      <Header />
      <div className="app">
        <SideBar handleCompose={handleCompose} />
        <MessageList />
      </div>
      {/* <Compose visible={composeVisible} /> */}
      
      {/* <Message /> */}
    </div>
  )
}
export default App;
