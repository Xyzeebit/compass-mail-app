import { useState, useEffect } from 'react';
import validator from 'email-validator';
import { IoSave, IoSend } from 'react-icons/io5';

import '../styles/compose.css';

export default function Compose({ user, contact, dispatch }) {
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState(user.to);
  const [to, setTo] = useState('');
  const [error, setError] = useState(true);

  const handleTos = ({ target }) => {
      setTo(target.value);
    if (!validator.validate(to)) {
        
        setError(true);
      } else {
      setError(false)
      
      }
    }

    const handleBody = ({ target }) => {
        setBody(target.value);
    }

    useEffect(() => {
      document.getElementsByClassName('nav-button')[0].classList.add('hide-mb');
      document.getElementsByClassName('search-box')[0].classList.add('hide-mb');
      document.querySelector('.contacts').classList.add('hide-mb');
    }, []);

    return (
      <section className="compose-message">
        <div>
          <label htmlFor="from">
            <span>From</span>
            <input type="text" value={user.from.email} id="from" randomly readOnly />
          </label>
          <label htmlFor="to">
            <span>To</span>
            <input
              type="email"
              value={to}
              id="to"
              onChange={handleTos}
              placeholder="recipient"
            />
          </label>
        </div>
        <div className="compose-body">
          <textarea value={body} onChange={handleBody} />
        </div>
        <div className="buttons">
          <button disabled={!body}>
            <IoSave size={20} />
            <span>Save</span>
          </button>
          <button disabled={error}>
            <IoSend size={20} />
            <span>Send</span>
          </button>
        </div>
      </section>
    );
}