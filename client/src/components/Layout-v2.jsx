import '../styles/layout.css';
import Sidebar from './Sidebar-v2';
import Mail from './Mail';
import Contacts from './Contact-v2';


export default function Layout({ sidebar, contacts, dispatch, children }) {
    const { expand } = sidebar;
    return (
        <div className="layout">
            <div className='aside-group'>
                <Sidebar sidebar={sidebar} dispatch={dispatch} />
                <Contacts contacts={contacts} dispatch={dispatch} />
            </div>
            <section className={`layout-container ${expand ? 'expand-container' : 'shrink-container'}`}>
                { children }
            </section>
        </div>
    )
}