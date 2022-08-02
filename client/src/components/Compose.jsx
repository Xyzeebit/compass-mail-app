import { useState, useEffect } from 'react';
import { IoMdExpand } from 'react-icons/io';
import { IoSave, IoSend } from 'react-icons/io5';

import '../styles/compose.css';

export default function Compose({ from, contact, dispatch }) {
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [to, setTo] = useState('');

    const handleTos = ({ target }) => {
        setTo(target.value);
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
            <input type="text" value={from} id="from" randomly />
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
          <button>
            <IoSave size={20} />
            <span>Save</span>
          </button>
          <button>
            <IoSend size={20} />
            <span>Send</span>
          </button>
        </div>
      </section>
    );
}