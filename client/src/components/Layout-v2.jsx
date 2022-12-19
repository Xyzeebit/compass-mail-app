import '../styles/layout.css';
import Sidebar from './Sidebar-v2';
import Loader from './Loader';
import Contacts from './Contact-v2';
import ComposeButton from './ComposeButton'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';


export default function Layout({ sidebar, user, dispatch, children }) {
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
            navigate('/auth/signin');
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            if (data && data.user && data.user.user) {
                dispatch({ type: 'FETCH_USER', user: data.user.user });
            }
        }
    }, [loading, data]);

    return (
        <div className="layout">
            <div className={'aside-group ' + (flyout ? 'slide-left' : '')}>
                <Sidebar sidebar={sidebar} dispatch={dispatch} />
                {!loading && <Contacts user={user} dispatch={dispatch} />}
            </div>
            {loading ?
                (<div className="load-user">
                    <Loader />
                </div>) : username ?
                (<section className={`layout-container ${expand ? 'expand-container' : 'shrink-container'}`}>
                    {children}
                    <ComposeButton />
                </section>) : (<div />)
            }
        </div>
    );
}