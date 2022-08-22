import { useState } from "react";
import { IoPerson } from "react-icons/io5";

export default function Contacts({ contacts, dispatch }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formVisible, setFormVisible] = useState(false);

    function addContact() {

    }
    function cancel() {
        setName('');
        setEmail('');
        setFormVisible(false);
    }
    
    return (
      <aside className={`contacts`}>
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
          </div>
        )}
        <ul className="contact-list">
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
          <li className="contact">
            <span className="avatar">
              <IoPerson size={30} />
            </span>
            <div>
              <h3>John Smith</h3>
              <p>johnsmith@compass.com</p>
            </div>
          </li>
        </ul>
      </aside>
    );
}

// https://random-data-api.com/api/v2/users?size=2