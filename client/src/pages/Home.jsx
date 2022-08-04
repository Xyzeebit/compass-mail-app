
import { useEffect, useReducer } from "react";

import logo from '../images/logo.png'
import bg from '../images/sustainable.jpg'
import '../styles/home.css';

export default function Home() {

    return (
      <div className="home">
        <div className="home-body">
          <div className="home-top">

            <img
              src={logo}
              alt="Compass home page"
              width="100"
              height="100"
            />

          </div>
          <div className="home-bottom">
            <h1>Compass Mail Sender</h1>
            <p>The top mail client in  the world</p>
            <div className="home-buttons">
              <button>Register</button>
              <button>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    );
}