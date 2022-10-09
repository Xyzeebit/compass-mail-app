import { useState, useEffect } from "react";
import { IoLogOut, IoPerson, IoSettings } from "react-icons/io5";
import logo from '../images/logo-w.png';
import { useNavigate } from "react-router-dom";


export default function Contacts({ user, dispatch }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    function addContact() {
      cancel();
    }
    function cancel() {
        setName('');
        setEmail('');
        setFormVisible(false);
    }
    function logout() {
      localStorage.setItem('compass', '');
      navigate('/auth/signin');
    }
  
  useEffect(() => {
    async function getMockUsers() {
      // https://random-data-api.com/api/v2/users?size=2
      const resp = await fetch(`https://randomuser.me/api/?results=${10}`);
      const users = await resp.json();
      if (resp.ok && users) {
        setList(users.results);
        // setUser({
        //   name: users.results[0].name.first + ' ' + users.results[0].name.last,
        //   photo: users.results[0].picture.medium
        // });
        
        setLoading(false);
      }
    }
    try {
      // getMockUsers();
    } catch (error) {
      console.log(error.message)
    }
  }, []);
    
  return (
    <aside className={`contacts`}>
      <div className="contacts-header">
        <img
          src={logo}
          alt="Compass Logo"
          width="50"
          height="50"
          className="spin sidebar-logo"
        />
        <h1 className="app-name">compass</h1>
      </div>
      {!user ? (
        <div className="card p-5 p-skeleton">
          <div className="p-text" />
          <div className="p-group">
            <div className="p-all" />
            <div className="p-image" />
          </div>
        </div>
      ) : (
        <div className={`profile`}>
          <p className="text">Profile</p>
          <div className="profile__group">
            {user.photo ? 
            (<img 
              src={user.photo}
              alt={user.firstName}
              width="75"
              height="75"
              className="photo"
            />) : 
            (<span className="avatar photo">
              <IoPerson size={70} />
            </span>)
            }
            <div className="name">
              <p>{user.firstName} { user.lastName}</p>
            </div>
          </div>
          <div className="profile__settings">
              <div className="group">
                <button onClick={() => setFormVisible(true)}>Add contact</button>
                <span title="settings" onClick={() => setShowPanel(!showPanel)}><IoSettings size={25} color={'#3940a7e0'} /></span>
              </div>
              {showPanel && <div className="settings__panel">
                <span title="sign out" onClick={logout}><IoLogOut size={25} color={'#3940a7e0'} /> <small>sign out</small></span>
              </div>}
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
        {loading && (
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
        {list && (
          <>
            {list.map((con, i) => (
              <>
                <li key={con.login.uuid} className={`contact`}>
                {con.picture ? (
                  <div className="photo-container">
                    <img
                      src={con.picture.thumbnail}
                      alt={con.name.first}
                      width="50"
                      height="50"
                      className="photo"
                    />
                  </div>
                ) : (
                  <span className="avatar">
                    <IoPerson size={30} />
                  </span>
                )}
                <div>
                  <h3>
                    {con.name.first} {con.name.last}
                  </h3>
                  <p>{con.email}</p>
                </div>
              </li>
                <div className="divider" />
              </>
            ))}
          </>
        )}
      </ul>
    </aside>
  );
}
