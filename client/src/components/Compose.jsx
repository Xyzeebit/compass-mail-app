import { useState } from 'react';
import { IoMdExpand } from 'react-icons/io';

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
    return (
      <section className="compose-message">
        <div className="compose-title-bar">
          <IoMdExpand />
        </div>
        <div>
          <label>
            <span>From</span>
            <input type="text" value={from} randomly />
          </label>
          <label>
            <span>To</span>
            <input
            type="email"
            value={to}
            onChange={handleTos}
            placeholder="recipient"
          />
          </label>
        </div>
        <div className="compose-body">
          <textarea value={body} onChange={handleBody} />
        </div>
        <div>
          <button>Send</button>
          <button>Save</button>
        </div>
      </section>
    );
}