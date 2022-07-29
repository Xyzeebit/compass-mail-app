
import { useEffect, useReducer } from "react";

import logo from '../images/logo.png'
import '../styles/home.css';

// use home for login signup and mail for home
export default function Home() {
  

    return (
      <main className="home">
        
        <div className="brand">
          <img
            src={logo}
            alt="Packmail Home page"
            width={35}
            height={35}
          />
          <h1>PACKMAIL</h1>
        </div>
      </main>
    );
}