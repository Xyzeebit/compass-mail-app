import { useState, useEffect } from 'react';
import validator from 'email-validator';
import { IoClose, IoSave, IoSend } from 'react-icons/io5';
import { IoPencil, IoEllipsisVertical, IoAttach } from 'react-icons/io5';
import { GoItalic, GoListUnordered, GoTextSize, GoBold } from 'react-icons/go';
import { RiAlignCenter, RiAlignJustify, RiAlignRight, RiAlignLeft, RiUnderline } from 'react-icons/ri';

import '../styles/compose.css';

export default function Compose({ user, contact, dispatch }) {
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState(true);
  const [open, setOpen] = useState(false);

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

    const closeComposer = () => {
      setOpen(false);
    }
    const openComposer = () => {
      setOpen(true);
    }
  

    useEffect(() => {
      // document.getElementsByClassName('nav-button')[0].classList.add('hide-mb');
      // document.getElementsByClassName('search-box')[0].classList.add('hide-mb');
      // document.querySelector('.contacts').classList.add('hide-mb');
    }, []);

    return (
      <div className={`compose-container ${open ? 'expand-composer' : ''}`}>
        <div className={`compose-group`}>
        <div className={`compose-header ${ open ? '' : 'hide-header'}`}>
          <span onClick={closeComposer}>
            <IoClose />
          </span>
        </div>
        <div className={`compose-message ${open ? "expand-message" : ''}`}>
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
                autocomplete="off"
                onChange={handleTos}
                placeholder="recipient"
              />
            </label>
            <label htmlFor="subject">
              <span>Subject</span>
              <input
                type="text"
                value={subject}
                id="subject"
                onChange={handleSubject}
                placeholder="message  title"
              />
            </label>
          </div>
          <div className="compose-body">
            <div className="shotcuts">
              <div className="shotcuts-left">
                <GoBold /> <RiUnderline /> <GoItalic /> <GoTextSize />
              </div>
              <div className="shotcuts-right">
                <GoListUnordered /> <RiAlignLeft /> <RiAlignCenter />{" "}
                <RiAlignRight /> <RiAlignJustify />
              </div>
            </div>
            <textarea
              value={body}
              onChange={handleBody}
              placeholder="Write your message..."
            />
          </div>
          <div className="send-save-buttons">
            <div className="compose-options">
              <IoEllipsisVertical size={20} />
              <IoAttach size={20} />
              <IoSave size={20} />
            </div>
            <button className="send-message">
              <span>Send</span>
              <IoSend size={20} />
            </button>
          </div>
        </div>
        </div>
        {!open && <div className={`compose-button`} onClick={openComposer}>
          <IoPencil />
          <span>Compose</span>
        </div>}
      </div>
    );
}