import { useState } from "react";
import { NavLink } from 'react-router-dom';
import style from "../styles/sidebar.css";
import compose_image from "../compose-icon.png";
import { GoInbox } from "react-icons/go";
import { IoMdTrash } from "react-icons/io";
import { IoSend, IoStar } from "react-icons/io5";
import { RiDraftFill, RiSpam2Fill } from "react-icons/ri";

export default function SideBar({ sidebar, dispatch }) {
  // const [compose, setCompose] = useState(false);

  // const { open } = sidebar;

  const handleCompose = () => {
    // setCompose(!compose);
  };

  return (
    <aside className={style.aside} aria-label="Sidebar menu">
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

      <nav>
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
          href="/mail/starred"
          title="Starred mail"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Starred">
            <IoStar size={20} />
          </div>
          <p>Starred</p>
        </NavLink>

        <NavLink
          href="/mail/outbox"
          title="Outbox"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Outbox">
            <IoSend size={20} />
          </div>
          <p>Outbox</p>
        </NavLink>

        <NavLink
          href="/mail/drafts"
          title="Drafts"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Drafts">
            <RiDraftFill size={20} />
          </div>
          <p>Drafts</p>
        </NavLink>

        <NavLink
          href="/mail/spam"
          title="Spam mail"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Spam mails">
            <RiSpam2Fill size={20} />
          </div>
          <p>Spam</p>
        </NavLink>

        <NavLink
          href="/mail/trash"
          title="Trash"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <div title="Trash">
            <IoMdTrash size={20} />
          </div>
          <p>Trash</p>
        </NavLink>
      </nav>
    </aside>
  );
}
