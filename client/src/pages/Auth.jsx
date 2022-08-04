import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Auth() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const location = useLocation();
    const paths = location.pathname.split('/')
    const formType = paths[paths.length - 1]

    console.log(paths)

    const handleName = (evt) => {
        setName(evt.target.value);
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
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={handleName} />
            </>
          )}

          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsername}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />

          {formType === 'signup' && <>
            <label htmlFor="cpassword">Confirm password</label>
            <input
              type="password"
              id="cpassword"
              value={cpassword}
              onChange={handleCPassword}
            />
          </>
}
          <input
            type="submit"
            value={formType === "signin" ? "Sign in" : "Sign up"}
          />
        </form>
      </div>
    );
}