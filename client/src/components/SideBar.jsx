import { useState } from "react";

import style from "../styles/sidebar.css";
import compose_image from "../compose-icon.png";
import { GoInbox } from "react-icons/go";
import { IoMdTrash } from "react-icons/io";
import { IoSend, IoStar } from "react-icons/io5";
import { RiDraftFill, RiSpam2Fill } from "react-icons/ri";

export default function SideBar() {
  const [compose, setCompose] = useState(false);
  const [active, setActive] = useState(0);

  const handleCompose = () => {
    setCompose(!compose);
  };

  const handleLinks = (value) => {
    setActive(value);
  };

  return (
    <aside className={style.aside} aria-label="Sidebar menu">
      <button
        className={`nav-button ${compose ? "expand-button" : ""}`}
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
      <nav onClick={handleLinks}>
        <a
          href="/mail/inbox"
          className={`${compose ? "expand" : ""} ${
            active === 0 ? "active" : ""
          }`}
          onClick={() => handleLinks(0)}
        >
          <div title="Inbox">
            <GoInbox size={25} />
          </div>
          <p>Inbox</p>
        </a>

        <a
          href="/mail/outbox"
          className={`${compose ? "expand" : ""} ${
            active === 1 ? "active" : ""
          }`}
          onClick={() => handleLinks(1)}
        >
          <div title="Outbox">
            <IoSend size={25} />
          </div>
          <p>Outbox</p>
        </a>
      </nav>
    </aside>
  );
}
