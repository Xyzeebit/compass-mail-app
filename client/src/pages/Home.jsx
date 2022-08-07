
import { useEffect, useReducer, useRef } from "react";
import { Link } from 'react-router-dom';

import logo from '../images/logo-w.png'
import bg from '../images/sustainable.jpg'
import '../styles/home.css';

export default function Home() {

  const buttonSignUp = useRef(null);
  const buttonSignIn = useRef(null);
  const fast = useRef(null);
  const easy = useRef(null);
  const reliable = useRef(null);

  useEffect(() => {
    fast.current.classList.add('fast');
    easy.current.classList.add('easy');
    reliable.current.classList.add('reliable');

    const blocks = document.getElementsByClassName('block');
    for (let el of blocks) {
      el.classList.add('fade-in');
    }

  }, [])

    return (
      <div className="home">
        <img
          src={logo}
          alt="Compass home page"
          width="40"
          height="40"
          className="home-logo spin"
        />
        <div className="intro">
          <div className="intro-headings">
            <h1 ref={fast}>Fast{", "} </h1>
            <h1 ref={easy}>Easy{", "} </h1>
            <h1 ref={reliable}>Reliable</h1>
          </div>
          <p>Fast email client for sending mail</p>
        </div>

        <div className="block b-1" />
        <div className="block b-2" />
        <div className="block b-3" />

        <div className="home-body">
          <div className="home-buttons">
            <div className="home-buttons">
              <Link to="/auth/signup" className="button-link" ref={buttonSignUp}>
                Sign up
              </Link>
              <Link to="/auth/signin" className="button-link" ref={buttonSignIn}>
                Sign in
              </Link>
            </div>
            {/* <img
              src={bg}
              alt="compass messages"
              width="100"
              height="100"
              className="home-desc-image"
            /> */}
          </div>
        </div>

        {/* <div className="home-body">
          <div className="home-top">
            <img src={logo} alt="Compass home page" width="100" height="100" />
          </div>
          <div className="home-bottom">
            <h1>Fast, Reliable, Easy, Compass Mailer</h1>
            <p>The top mail client in the world</p>
            <div className="home-buttons">
              <Link to="/auth/signup" ref={buttonSignUp}>
                Sign up
              </Link>
              <Link to="/auth/signin" ref={buttonSignIn}>
                Sign in
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    );
}