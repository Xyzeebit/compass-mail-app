import logo from '../images/logo-w.png';

import { NavLink, useNavigate } from 'react-router-dom';
import style from "../styles/sidebar.css";
import compose_image from "../compose-icon.png";
import { GoInbox } from "react-icons/go";
import { IoMdContact, IoMdContacts, IoMdTrash } from "react-icons/io";
import { IoSend, IoStar } from "react-icons/io5";

// IoMdContact
import { RiDraftFill, RiSpam2Fill } from "react-icons/ri";
import NavButton from './NavButton';



export default function Sidebar({ sidebar, dispatch }) {
    const navigate = useNavigate();

    const { open } = sidebar;

    const handleCompose = () => {
      navigate("/compose");
    };

    const closeSidebar = () => {
      // dispatch({ type: 'TOGGLE_SIDEBAR' });
    };
    const showContacts = () => {
      dispatch({ type: "TOGGLE_SIDEBAR" });
      dispatch({ type: "SHOW_CONTACTS" });
    };
    return (
      <aside className="sidebar">
        <img
          src={logo}
          alt="Compass Logo"
          width="50"
          height="50"
          className="spin sidebar-logo"
        />
        <nav className={`${open ? "expand" : ""} flex-center flex-column`} onClick={closeSidebar}>

          <NavButton link="/inbox" label={"inbox"} title="Inbox mail">
            <GoInbox size={20} />
          </NavButton>
          {/* <NavLink
            to="/inbox"
            title="Inbox mail"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div title="Inbox">
              <GoInbox size={20} />
            </div>
            <p>Inbox</p>
          </NavLink>

          <NavLink
            to="/starred"
            title="Starred mail"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div title="Starred">
              <IoStar size={20} />
            </div>
            <p>Starred</p>
          </NavLink>

          <NavLink
            to="/outbox"
            title="Outbox"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div title="Outbox">
              <IoSend size={20} />
            </div>
            <p>Outbox</p>
          </NavLink>

          <NavLink
            to="/drafts"
            title="Drafts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div title="Drafts">
              <RiDraftFill size={20} />
            </div>
            <p>Drafts</p>
          </NavLink>

          <NavLink
            to="/spam"
            title="Spam mail"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div title="Spam mails">
              <RiSpam2Fill size={20} />
            </div>
            <p>Spam</p>
          </NavLink>

          <NavLink
            to="/trash"
            title="Trash"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div title="Trash">
              <IoMdTrash size={20} />
            </div>
            <p>Trash</p>
          </NavLink>
          
          <button className="contact-button" onClick={showContacts}>
            <IoMdContacts size={20} />
            <span>Contacts</span>
          </button> */}
        </nav>
      </aside>
    );
}