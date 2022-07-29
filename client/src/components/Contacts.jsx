import '../styles/contacts.css'
// import { IoMdContact } from 'react-icons/io'
import { RiContactsBook2Fill } from 'react-icons/ri'
import { IoPersonAddSharp } from 'react-icons/io5'
import { useState, memo } from 'react';

export default function Contacts({ contacts, dispatch }) {
    const [addContact, setAddContact] = useState(false);
    const addNewContact = () => {
        setAddContact(true)
    }
    return (
      <aside className="contacts">
        <h1>
          <RiContactsBook2Fill />
          {"  Contacts"}
        </h1>
        {addContact && <ContactForm setAddContact={setAddContact} dispatch={dispatch} />}
        <>
          {contacts.map((contact, i) => {
            return <Contact {...contact} key={i + contact.id + i} />;
          })}
          <button onClick={addNewContact}>
            <IoPersonAddSharp size={20} />
            <span>Add contact</span>
          </button>
        </>
      </aside>
    );
}


function Contact({ name, email }) {
    return (
      <article className="contact" aria-label={name}>
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
    const [email, setEmail] = useState('')

    const submit = (evt) => {
        evt.preventDefault();
    }
    const cancel = () => {
        setEmail('')
        setName('');
        setAddContact(false);
    }
    return (
      <form onSubmit={submit}>
        <div className="input-group">
          <input
            type="text"
            value={name}
            id="contact-name"
            onChange={(evt) => setName(evt.target.value)}
          />
          <label htmlFor="contact-name">Name</label>
        </div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            id="contact-email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <label htmlFor="contact-email">Email</label>
        </div>
            <div className='form-buttons'>
                <input type="button" onClick={cancel} value="Cancel" />
                <input type="submit" value="Save" />
        </div>
      </form>
    );
}