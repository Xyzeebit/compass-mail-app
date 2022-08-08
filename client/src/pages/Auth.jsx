import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoEye, IoEyeOff } from 'react-icons/io5';

import '../styles/auth.css';

export default function Auth() {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordOrText, setPasswordOrText] = useState('password');
  const [passwordError, setPasswordError] = useState('');

  const [cpassword, setCPassword] = useState('');
  const [cpasswordOrText, setCPasswordOrText] = useState("password");
  const [cpasswordError, setCPasswordError] = useState('');

  const [rememberMe, setRememberMe] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const error = "1px solid #f44336";
  const noError = "1px solid #3940a7e0";

  const errorOutline = "#f44336";
  const noErrorOutline = "#3940a7e0";

    const location = useLocation();
    const paths = location.pathname.split('/')
    const formType = paths[paths.length - 1]

    const handleName = (evt) => {
        // setName(evt.target.value);
    }

  const handleFirstName = (evt) => {
    setFirstName(evt.target.value);
  }
  const handleLastName = evt => {
    setLastName(evt.target.value);
  }
    const handleUsername = evt => {
        setUsername(evt.target.value);
    }
    const handlePassword = evt => {
        setPassword(evt.target.value)
  }
  const handlePasswordFocused = evt => {
    passwordRef.current.style.border = "2px solid #3940a7e0";
  }
  const handlePasswordBlurred = evt => {
    passwordRef.current.style.border = "1px solid #3940a7e0";
    if (passwordError) {
      passwordRef.current.style.border = error;
      passwordRef.current.style.outline = errorOutline;
    }
  }


  const handleCPassword = evt => {
    setCPassword(evt.target.value)
  }

  const handleCPasswordFocused = (evt) => {
    cpasswordRef.current.style.border = "2px solid #3940a7e0";
  };
  const handleCPasswordBlurred = (evt) => {
    cpasswordRef.current.style.border = "1px solid #3940a7e0";
    if (cpasswordError) {
      cpasswordRef.current.style.border = error;
      cpassword.current.style.outline = errorOutline;
    }
  };

  const taken = async (username) => {
    return false;
  }


    const handleSubmit = evt => {
      evt.preventDefault();
      if (formType === 'signup') {
        if (firstName.length < 3) {
          setFirstNameError('First name too short');
        }
        if (firstName.length > 16) {
          setFirstNameError("First name too long");
        }
        if (lastName.length < 3) {
          setLastNameError('Last name too short');
        }
        if (lastName.length > 16) {
          setLastNameError('Last name too long');
        }
        if (username.length) {
          setUsernameError('Username should be at least 6 characters long');
        }
        if (taken(username)) {
          setUsernameError("Username is already in use");
        }
        if (password.length < 6) {
          setPasswordError('Password is must be at least 6 characters long');
        }
        if (password.length > 50) {
          setPasswordError("Password should not exceed 50 characters");
        }
        if (cpassword !== password) {
          setCPasswordError('Passwords do not match');
          setCanSubmit(true);
        }
      } else {
        if (password.length < 6) {
          setPasswordError("Password is must be at least 6 characters long");
        }
        if (password.length < 6) {
          setPasswordError("Password is must be at least 6 characters long");
        }
        if (password.length > 50) {
          setPasswordError("Password should not exceed 50 characters");
        }
        setCanSubmit(true);
      }
    }

  

    return (
      <div className="auth">
        <form onSubmit={handleSubmit}>
          {formType === "signup" && (
            <>
              <div className="stack">
                <label htmlFor="first-name">First name</label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={handleFirstName}
                  style={{
                    border: firstNameError ? error : noError,
                    outline: firstNameError ? errorOutline : noErrorOutline,
                  }}
                />
              </div>
              <div className="stack">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  id="name"
                  value={lastName}
                  onChange={handleLastName}
                  style={{
                    border: lastNameError ? error : noError,
                    outline: lastNameError ? errorOutline : noErrorOutline,
                  }}
                />
              </div>
            </>
          )}

          <div className="stack">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsername}
              style={{
                border: usernameError ? error : noError,
                outline: usernameError ? errorOutline : noErrorOutline,
              }}
            />
          </div>

          <div className="stack">
            <label htmlFor="password">Password</label>
            <div
              className="input-group"
              ref={passwordRef}
              style={{
                border: passwordError ? error : noError,
                outline: passwordError ? errorOutline : noErrorOutline,
              }}
            >
              <input
                type={passwordOrText}
                id="password"
                value={password}
                onChange={handlePassword}
                onFocus={handlePasswordFocused}
                onBlur={handlePasswordBlurred}
              />
              {passwordOrText === "text" ? (
                <IoEyeOff onClick={() => setPasswordOrText("password")} />
              ) : (
                <IoEye onClick={() => setPasswordOrText("text")} />
              )}
            </div>
          </div>

          {formType === "signup" ? (
            <div className="stack">
              <label htmlFor="cpassword">Confirm password</label>
              <div
                className="input-group"
                ref={cpasswordRef}
                style={{
                  border: cpasswordError ? error : noError,
                  outline: cpasswordError ? errorOutline : noErrorOutline,
                }}
              >
                <input
                  type={cpasswordOrText}
                  id="cpassword"
                  value={cpassword}
                  onChange={handleCPassword}
                  onFocus={handleCPasswordFocused}
                  onBlur={handleCPasswordBlurred}
                />
                {cpasswordOrText === "text" ? (
                  <IoEyeOff onClick={() => setCPasswordOrText("password")} />
                ) : (
                  <IoEye onClick={() => setCPasswordOrText("text")} />
                )}
              </div>
            </div>
          ) : (
            <div className="stack">
              <input
                type="checkbox"
                id="remember-me"
                value={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me" className="remember-me">
                Remember me
              </label>
            </div>
          )}
          <div className="stack">
            <input
              type="submit"
              value={formType === "signin" ? "Sign in" : "Sign up"}
            />
          </div>

          {formType === "signin" ? (
            <p>
              Don't have an account? <Link to="/auth/signup">sign up</Link>
            </p>
          ) : (
            <p>
              Already have an account <Link to="/auth/signin">sign in</Link>
            </p>
          )}
        </form>
      </div>
    );
}