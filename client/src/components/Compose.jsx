import { useState, useEffect } from 'react';
import validator from 'email-validator';
import { IoSave, IoSend } from 'react-icons/io5';
import { IoPencil } from 'react-icons/io5';
import { GoItalic, GoListUnordered, GoTextSize } from 'react-icons/go';
import { RiAlignBottom, RiAlignCenter, RiAlignJustify, RiAlignRight, RiAlignLeft } from 'react-icons/ri';

import '../styles/compose.css';

export default function Compose({ user, contact, dispatch }) {
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
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
  const handleSubject = ({ target }) => {
    setSubject(target.value);
  }

    const handleBody = ({ target }) => {
        setBody(target.value);
    }

    useEffect(() => {
      // document.getElementsByClassName('nav-button')[0].classList.add('hide-mb');
      // document.getElementsByClassName('search-box')[0].classList.add('hide-mb');
      // document.querySelector('.contacts').classList.add('hide-mb');
    }, []);

    return (
      <div className={`compose-container`}>
        <div className="compose-message">
          <div className="form-header">
            <label htmlFor="from">
              <span>From</span>
              <input
                type="text"
                value={"john@mail.com"}
                id="from"
                randomly
                readOnly
              />
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
            <label htmlFor="subject">
              <span>Subject</span>
              <input
                type="email"
                value={subject}
                id="subject"
                onChange={handleSubject}
                placeholder="recipient"
              />
            </label>
          </div>
          <div className="compose-body">
            <div>
              <GoItalic /> <GoListUnordered /> <GoTextSize /> <RiAlignBottom />
              <RiAlignLeft /> <RiAlignJustify /> <RiAlignRight /> <RiAlignCenter />
            </div>
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
        </div>
        <div className={`compose-button`}>
          <IoPencil />
          <span>Compose</span>
        </div>
      </div>
    );
}