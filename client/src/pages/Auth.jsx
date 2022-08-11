import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Loader from '../components/Loader';

import { useQuery, useMutation } from '@apollo/client';
import { GET_USERNAME, SIGN_IN } from "../queries";

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
  const [tac, setTac] = useState(false);
  const [tacError, setTacError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const [authData, setAuthData] = useState({});
  const [authError, setAuthError] = useState({ error: false, message: '' });

  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const error = "1px solid #f44336";
  const noError = "1px solid #3940a7e0";

  const errorOutline = "#f44336";
  const noErrorOutline = "#3940a7e0";

    const location = useLocation();
    const paths = location.pathname.split('/')
    const formType = paths[paths.length - 1]

    const taken = async (username) => {
      return false;
    };

  const handleFirstName = (evt) => {
    setFirstName(evt.target.value);
  }
  const handleFirstNameBlurred = () => {
    if (firstName.length < 3) {
      setFirstNameError("First name must be at least 3 characters long");
    } else if (firstName.length > 16) {
      setFirstNameError("First name must not exceed 16 characters");
    } else {
      setFirstNameError('')
    }
  }
  const handleLastName = evt => {
    setLastName(evt.target.value);
  }
  const handleLastNameBlurred = () => {
    if (lastName.length < 3) {
      setLastNameError("Last name must be at least 3 characters long");
    } else if (lastName.length > 16) {
      setLastNameError("Last name must not exceed 16 characters");
    } else {
      setLastNameError("");
    }
  }
    const handleUsername = evt => {
        setUsername(evt.target.value);
  }
  const handleUsernameBlurred = async () => {
    if (username.length < 6) {
      setUsernameError("Username should be at least 6 characters long");
    } else if(username.length > 16) {
      setUsernameError("Username too long, should not exceed 16 characters");
    } else {
      const inUse = await taken(username);
      if (inUse) {
        setUsernameError("Username is already taken");
      } else {
      setUsernameError("");
      }
    }
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
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (password.length > 50) {
      setPasswordError("Password should not exceed 50 characters");
    } else {
      setPasswordError("");
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
    if (cpassword !== password) {
      setCPasswordError("Passwords do not match");
    }
  };



    const handleSubmit = evt => {
      evt.preventDefault();
      if (formType === 'signup') {
        if (lastNameError || 
          firstNameError ||
          usernameError ||
          passwordError ||
          cpasswordError ||
          !firstName ||
          !lastName ||
          !password ||
          !cpassword ||
          !username
        ) {
          setCanSubmit(false);
        } else {
          if (tac) {
            setAuthData({
              firstName,
              lastName,
              username,
              password,
              type: 'signup'
            });
            setCanSubmit(true);
          } else {
            setTacError(true)
            setCanSubmit(false);
          }
        }
      } else {
        if (!username || usernameError || !password || passwordError) {
          setCanSubmit(false);
        } else {
          setAuthData({
            username,
            password,
            type: 'signin'
          });
          setCanSubmit(true);
        }
      }
    }

    useEffect(() => {
      if(formType === 'signup') {
        document.title = 'Compass | Register account';
      } else {
        document.title = 'Compass | Log in to your account';
      }
    }, [])
  

    return (
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>{formType === "signup" ? "Register" : "Login"}</h1>
          {formType === "signup" && (
            <>
              <div className="stack">
                <label htmlFor="first-name">First name</label>
                {firstNameError && (
                  <p className="p-error-text">{firstNameError}</p>
                )}
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={handleFirstName}
                  onBlur={handleFirstNameBlurred}
                  style={{
                    border: firstNameError ? error : noError,
                    outline: firstNameError ? errorOutline : noErrorOutline,
                  }}
                />
              </div>
              <div className="stack">
                <label htmlFor="name">Last name</label>
                {lastNameError && (
                  <p className="p-error-text">{lastNameError}</p>
                )}
                <input
                  type="text"
                  id="name"
                  value={lastName}
                  onChange={handleLastName}
                  onBlur={handleLastNameBlurred}
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
            {usernameError && <p className="p-error-text">{usernameError}</p>}
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsername}
              onBlur={handleUsernameBlurred}
              style={{
                border: usernameError ? error : noError,
                outline: usernameError ? errorOutline : noErrorOutline,
              }}
            />
          </div>

          <div className="stack">
            <label htmlFor="password">Password</label>
            {passwordError && <p className="p-error-text">{passwordError}</p>}
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
              {cpasswordError && (
                <p className="p-error-text">{cpasswordError}</p>
              )}
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
            <div className="stack flex-between remember-forget">
              <div>
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
              <Link
                to="/auth/recoverpassword"
                className=""
                onClick={(evt) => evt.preventDefault()}
              >
                Forget password
              </Link>
            </div>
          )}

          {formType === "signup" && (
            <div className="stack">
              <div className="flex-between">
                <input
                  type="checkbox"
                  id="tac"
                  value={tac}
                  onChange={() => setTac(!tac)}
                />
                <label htmlFor="tac" className="tac">
                  I agree to the{" "}
                  <Link to="/policies" onClick={(evt) => evt.preventDefault()}>
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/policies" onClick={(evt) => evt.preventDefault()}>
                    Conditions
                  </Link>
                </label>
              </div>
              {(tacError && (tac === false)) ? <p className="p-error-text">You must agree to the terms and conditions</p> : <span></span>}
            </div>
          )}

          <div className="stack">
            <input
              type="submit"
              value={formType === "signin" ? "Sign in" : "Register"}
            />
          </div>

          {formType === "signin" ? (
            <p className="p-link-text">
              Don't have an account? <Link to="/auth/signup">sign up</Link>
            </p>
          ) : (
            <p className="p-link-text">
              Already have an account <Link to="/auth/signin">sign in</Link>
            </p>
          )}

          {canSubmit &&
            (<>
            {authData.type === "signin" ?
              (<AuthSignIn {...authData} />) :
              (<AuthSignUp {...authData} />)
            }
            </>)
          }

          {<NotificationBubble isError={true} message="Invalid username or password" />}

        </form>
      </div>
    );
}

const AuthSignUp = ({ firstName, lastName, username, password }) => {
  const loaderRef = useRef(null);
  const navigate = useNavigate();
  // const { type, username, password, firstName, lastName } = authData;
  

  useEffect(() => {
    const timer = setTimeout(() => {
      loaderRef.current.classList.add("auth-spread");
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // navigate('/inbox');
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="auth-loading flex-center flex-column" ref={loaderRef}>
        <Loader />
        {/* {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {data && <p>Username: {data.username}</p>} */}
      </div>
    );
}

const AuthSignIn = ({ username, password }) => {
   const loaderRef = useRef(null);
   const navigate = useNavigate();
  const [login, { loading, error, data }] = useMutation(SIGN_IN);
  const [user, setUser] = useState({ token: '' });

  useEffect(() => {
    
    const timer = setTimeout(() => {
      loaderRef.current.classList.add("auth-spread");
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    login({
      variables: {
        input: { username, password }
      }
    });
  }, [username, password, login]);

  useEffect(() => {
    if (data) {
      if(data.signIn.success) {
        setUser({
          token: data.signIn.user.token,
          id: data.signIn.user.id
        })
      }
    }
  }, [data]);


  return (
    <div className="auth-loading flex-center flex-column" ref={loaderRef}>
      {loading && <Loader />}
      
      {error && <p>{error.message}</p>}
      {user.token &&
        (<>
          <p>{username}</p>
          <p>{user.id}</p>
          <p>{user.token}</p>
        </>)
      }
      
    </div>
  );
}

function NotificationBubble({ isError, message }) {
  const notification = useRef(null);
  useEffect(() => {
    const timeIn = setTimeout(() => {
      notification.current.classList.add('show-notification')
    }, 50);
    const timeOut = setTimeout(() => {
      notification.current.classList.remove('show-notification')
    }, 5000);
    return () => {
      clearTimeout(timeIn);
      clearTimeout(timeOut);
    }
  }, []);
  return (
    <div className={`${isError ? 'error-bubble' : ''} notification-bubble`} ref={notification}>
      {message}
    </div>
  );
}