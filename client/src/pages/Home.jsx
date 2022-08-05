
import { useEffect, useReducer } from "react";
import { Link } from 'react-router-dom';

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
            <h1>Fast, Reliable, Easy, Compass Mailer</h1>
            <p>The top mail client in  the world</p>
            <div className="home-buttons">
              <Link to="/auth/signup">Sign up</Link>
              <Link to="/auth/signin">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    );
}