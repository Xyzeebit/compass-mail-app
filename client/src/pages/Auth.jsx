import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import '../styles/auth.css';

export default function Auth() {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [cpassword, setCPassword] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');

  const [rememberMe, setRememberMe] = useState(false);

    const location = useLocation();
    const paths = location.pathname.split('/')
    const formType = paths[paths.length - 1]

    console.log(paths)

    const handleName = (evt) => {
        // setName(evt.target.value);
    }
    const handleUsername = evt => {
        setUsername(evt.target.value);
    }
    const handlePassword = evt => {
        setPassword(evt.target.value)
    }
    const handleCPassword = evt => {
        setCPassword(evt.target.value)
    }
    const handleSubmit = evt => {
        evt.preventDefault();
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
                  onChange={handleName}
                />
              </div>
              <div className="stack">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  id="name"
                  value={lastName}
                  onChange={handleName}
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
            />
          </div>

          <div className="stack">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          {formType === "signup" ? (
            <div className="stack">
              <label htmlFor="cpassword">Confirm password</label>
              <input
                type="password"
                id="cpassword"
                value={cpassword}
                onChange={handleCPassword}
              />
            </div>
          ) : (
            <div className="stack">
              <input
                  type="checkbox"
                  id="remember-me"
                value={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
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
              Already have an account <Link to="/auth/signin">Sign in</Link>
            </p>
          )}
        </form>
      </div>
    );
}