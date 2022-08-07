
import { useEffect, useReducer, useRef } from "react";
import { Link } from 'react-router-dom';

import logo from '../images/logo.png'
import bg from '../images/sustainable.jpg'
import '../styles/home.css';

export default function Home() {

  const buttonSignUp = useRef(null);
  const buttonSignIn = useRef(null);

  useEffect(() => {
    buttonSignUp.current.classList.add('slide-btn');
    buttonSignIn.current.classList.add('slide-btn');

  }, [])

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
              <Link to="/auth/signup" ref={buttonSignUp}>Sign up</Link>
              <Link to="/auth/signin" ref={buttonSignIn}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    );
}