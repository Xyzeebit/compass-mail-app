import { useState } from "react";

import style from "../styles/sidebar.css";
import compose_image from "../compose-icon.png";
import { GoInbox } from "react-icons/go";
import { IoMdTrash } from "react-icons/io";
import { IoSend, IoStar } from "react-icons/io5";
import { RiDraftFill, RiSpam2Fill } from "react-icons/ri";

export default function SideBar({ sidebar, dispatch }) {
  const [compose, setCompose] = useState(false);
  const [active, setActive] = useState(0);
  const { open } = sidebar;

  const handleCompose = () => {
    setCompose(!compose);
  };

  const handleLinks = (evt, value) => {
    // evt.preventDefault();
    setActive(value);
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
        <a
          href="/mail/inbox"
          title="Inbox mail"
          className={`${open ? "expand" : ""} ${
            active === 0 ? "active" : ""
          }`}
          onClick={(evt) => handleLinks(evt, 0)}
        >
          <div title="Inbox">
            <GoInbox size={20} />
          </div>
          <p>Inbox</p>
        </a>

        <a
          href="/mail/starred"
          title="Starred mail"
          className={`${open ? "expand" : ""} ${
            active === 1 ? "active" : ""
          }`}
          onClick={(evt) => handleLinks(evt, 1)}
        >
          <div title="Starred">
            <IoStar size={20} />
          </div>
          <p>Starred</p>
        </a>

        <a
          href="/mail/outbox"
          title="Outbox"
          className={`${open ? "expand" : ""} ${
            active === 2 ? "active" : ""
          }`}
          onClick={(evt) => handleLinks(evt, 2)}
        >
          <div title="Outbox">
            <IoSend size={20} />
          </div>
          <p>Outbox</p>
        </a>

        <a
          href="/mail/drafts"
          title="Drafts"
          className={`${open ? "expand" : ""} ${
            active === 3 ? "active" : ""
          }`}
          onClick={(evt) => handleLinks(evt, 3)}
        >
          <div title="Drafts">
            <RiDraftFill size={20} />
          </div>
          <p>Drafts</p>
        </a>

        <a
          href="/mail/spam"
          title="Spam mail"
          className={`${open ? "expand" : ""} ${
            active === 4 ? "active" : ""
          }`}
          onClick={(evt) => handleLinks(evt, 4)}
        >
          <div title="Spam mails">
            <RiSpam2Fill size={20} />
          </div>
          <p>Spam</p>
        </a>

        <a
          href="/mail/trash"
          title="Trash"
          className={`${open ? "expand" : ""} ${
            active === 5 ? "active" : ""
          }`}
          onClick={(evt) => handleLinks(evt, 5)}
        >
          <div title="Trash">
            <IoMdTrash size={20} />
          </div>
          <p>Trash</p>
        </a>
      </nav>
    </aside>
  );
}
