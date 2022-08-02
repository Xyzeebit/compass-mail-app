import '../styles/contacts.css'
import { useNavigate } from 'react-router-dom';
import { RiContactsBook2Fill } from 'react-icons/ri'
import { IoArrowForward, IoPersonAddSharp } from 'react-icons/io5'

import { GoAlert } from 'react-icons/go';
import { useState, useEffect } from 'react';
import validator from 'email-validator';

export default function Contacts({ contacts, dispatch }) {
  const [addContact, setAddContact] = useState(false);
  const [first, setFirst] = useState(true);
  const navigate = useNavigate();

    const addNewContact = () => {
        setAddContact(true);
  }
  
  const handleClick = email => {
    dispatch({ type: 'TO', to: email });
    navigate('/mail/compose');
  }

  useEffect(() => {
    
    const slideInTimer = setTimeout(() => {
      if (first) {
        dispatch({ type: 'SHOW_CONTACTS' });
        setFirst(false);
      }
    }, 1000);

    return () => clearTimeout(slideInTimer);
  }, [first, dispatch]);

    return (
      <aside className={`contacts ${contacts.open ? 'slide-in' : ''}`}>
        <div className='close-button__panel'>
          <button onClick={() => dispatch({ type: 'CLOSE_CONTACTS'})}>
            <IoArrowForward size={25} />
          </button>
        </div>

        <div className='contacts-panel'>
        <h1>
          <RiContactsBook2Fill />
          {"  Contacts"}
        </h1>
        {addContact && <ContactForm setAddContact={setAddContact} dispatch={dispatch} />}
        {!addContact && <>
          {contacts.contacts.map((contact, i) => {
            return <Contact {...contact} key={i + contact.id + i} handleClick={ () => handleClick(contact.email) } />;
          })}
          <button className='add-contact' onClick={addNewContact}>
            <IoPersonAddSharp size={20} />
            <span>Add contact</span>
          </button>
          </>}
          </div>
      </aside>
    );
}


function Contact({ name, email, handleClick }) {
    return (
      <article className="contact" aria-label={name} onClick={handleClick}>
        {/* <div className="icon"><IoMdContact size={40} /></div> */}
        <div className="icon">{name.substring(0, 1).toUpperCase()}</div>
        <div className="details">
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </article>
    );
}

function ContactForm({ setAddContact, dispatch }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  const [emailErr, setEmailError] = useState('');
  const [nameErr, setNameError] = useState('');

    const submit = (evt) => {
        evt.preventDefault();
        if (name.length < 3 || name.length > 25) {
            setNameError('Enter a valid name');
            return;
        }
        if (!validator.validate(email)) { 
            setEmailError("Enter a valid email address");
            return;
        }
        if (!emailErr || !nameErr) {
            dispatch({ type: 'ADD_CONTACT', contact: { name, email } });
            cancel();
        }
    }
    const cancel = () => {
        setEmail('')
        setName('');
        setEmailError('');
        setNameError('')
        setAddContact(false);
    }
    return (
      <form onSubmit={submit}>
        <h2>Add New Contact</h2>
        {nameErr && (
          <p style={{ color: "red" }}>
            <GoAlert color="red" /> {nameErr}
          </p>
        )}
        {emailErr && (
          <p style={{ color: "red" }}>
            <GoAlert color="red" /> {emailErr}
          </p>
        )}
        <div className="input-group">
          <input
            type="text"
            value={name}
            id="contact-name"
            onChange={(evt) => setName(evt.target.value)}
          />
          {!name && <label htmlFor="contact-name">Name</label>}
        </div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            id="contact-email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
          {!email && <label htmlFor="contact-email">Email</label>}
        </div>
        <div className="form-buttons">
          <input type="button" onClick={cancel} value="Cancel" />
          <input type="submit" value="Save" />
        </div>
      </form>
    );
}