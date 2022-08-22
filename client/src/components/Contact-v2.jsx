import { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";

export default function Contacts({ contacts, dispatch }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    function addContact() {

    }
    function cancel() {
        setName('');
        setEmail('');
        setFormVisible(false);
  }
  
  useEffect(() => {
    async function getMockUsers() {
      // https://random-data-api.com/api/v2/users?size=2
      const resp = await fetch(`https://random-data-api.com/api/v2/users?size=${10}`);
      const users = await resp.json();
      if (resp.ok && users) {
        setList(users);
      }
    }
  })
    
  return (
    <aside className={`contacts`}>
      <h1 className="app-name">compass</h1>
      {loading ? (
        <div className="card p-5 p-skeleton">
          <div className="p-text" />
          <div className="p-all" />
          <div className="p-image" />
        </div>
      ) : (
        <div className={`profile`}>
          <p className="text">Profile</p>
          <span className="avatar photo">
            <IoPerson size={40} />
          </span>
          <div className="name">
            <p>John Doe</p>
            <button onClick={() => setFormVisible(true)}>Add contact</button>
          </div>
        </div>
      )}
      {formVisible && (
        <div className="contact-form">
          <h4>Add new contact</h4>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <button className="form-button save" onClick={addContact}>
            Save
          </button>
          <button className="form-button cancel" onClick={cancel}>
            Cancel
          </button>
        </div>
      )}

      <ul className="contact-list">
        {list.length === 0 && (
          <>
            <li className="c-skeleton card">
              <div className="c-image" />
              <div className="c-group">
                <div className="c-name" />
                <div className="c-email" />
              </div>
            </li>
            <li className="c-skeleton card">
              <div className="c-image" />
              <div className="c-group">
                <div className="c-name" />
                <div className="c-email" />
              </div>
            </li>
          </>
        )}
        {list &&
          (<>
            {list.map((con, i) => (
            <li key={i} className={`contact`}>
              <span className="avatar">
                <IoPerson size={30} />
              </span>
              <div>
                <h3>{con.name}</h3>
                <p>{con.email}</p>
              </div>
            </li>
            ))}
          </>)}
      </ul>
    </aside>
  );
}

// https://random-data-api.com/api/v2/users?size=2