import '../styles/layout.css';
import Sidebar from './Sidebar-v2';
import Loader from './Loader';
import Contacts from './Contact-v2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';


export default function Layout({ sidebar, contacts, dispatch, children }) {
    const { expand, flyout } = sidebar;
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const { loading, error, data } = useUser(username, token);
    const navigate = useNavigate();

    useEffect(() => {
        let storage = localStorage.getItem('compass');
        if (storage) {
            storage = JSON.parse(storage);
            setUsername(storage.username)
            setToken(storage.token);
            
        } else {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log(data)
        }
    }, [loading]);

    return (
        <div className="layout">
            <div className={'aside-group ' + (flyout ? 'slide-left' : '')}>
                <Sidebar sidebar={sidebar} dispatch={dispatch} />
                {!loading && <Contacts contacts={contacts} dispatch={dispatch} />}
            </div>
            {loading ? <div className="load-user">
                <Loader />
            </div> :
            <section className={`layout-container ${expand ? 'expand-container' : 'shrink-container'}`}>
                { children }
            </section>}
        </div>
    );
}