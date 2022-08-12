import '../styles/layout.css';
import Sidebar from './Sidebar-v2';
import Mail from './Mail';


export default function Layout({ sidebar, dispatch, children }) {
    return (
        <div className="layout">
            <Sidebar sidebar={sidebar} dispatch={dispatch} />
            { children }
        </div>
    )
}