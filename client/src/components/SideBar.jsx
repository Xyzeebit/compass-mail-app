import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import style from "../styles/sidebar.css";
import compose_image from "../compose-icon.png";
import { GoInbox } from "react-icons/go";
import { IoMdContact, IoMdContacts, IoMdTrash } from "react-icons/io";
import { IoSend, IoStar } from "react-icons/io5";

// IoMdContact
import { RiDraftFill, RiSpam2Fill } from "react-icons/ri";

export default function SideBar({ sidebar, dispatch }) {
  const navigate = useNavigate();

  const { open } = sidebar;

  const handleCompose = () => {
    navigate('/mail/compose');
  };

  const closeSidebar = () => {
    // dispatch({ type: 'TOGGLE_SIDEBAR' });
  }
  const showContacts = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
    dispatch({ type: 'SHOW_CONTACTS' });
  }

  return (
    <aside className={`${open ? 'expand-mb' : 'collapse-mb'} menu`} aria-label="Sidebar menu">
      <button title="Compose mail"
        className="nav-button"
        onClick={handleCompose}
      >
        <div>
          <img
            src={compose_image}
            alt="Compose new message button"
            width="30"
            height="30"
          />
        </div>
        <p>Compose</p>
      </button>

      <nav className={open ? 'expand' : ''} onClick={closeSidebar}>
        <NavLink
          to="/mail/inbox"
          title="Inbox mail"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Inbox">
            <GoInbox size={20} />
          </div>
          <p>Inbox</p>
        </NavLink>

        <NavLink
          to="/mail/starred"
          title="Starred mail"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Starred">
            <IoStar size={20} />
          </div>
          <p>Starred</p>
        </NavLink>

        <NavLink
          to="/mail/outbox"
          title="Outbox"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Outbox">
            <IoSend size={20} />
          </div>
          <p>Outbox</p>
        </NavLink>

        <NavLink
          to="/mail/drafts"
          title="Drafts"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Drafts">
            <RiDraftFill size={20} />
          </div>
          <p>Drafts</p>
        </NavLink>

        <NavLink
          to="/mail/spam"
          title="Spam mail"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Spam mails">
            <RiSpam2Fill size={20} />
          </div>
          <p>Spam</p>
        </NavLink>

        <NavLink
          to="/mail/trash"
          title="Trash"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Trash">
            <IoMdTrash size={20} />
          </div>
          <p>Trash</p>
        </NavLink>
        <hr />
        <button className="contact-button" onClick={showContacts}>
          <IoMdContacts size={20} />
          <span>Contacts</span>
        </button>
      </nav>
    </aside>
  );
}
