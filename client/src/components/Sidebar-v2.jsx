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
        <nav
          className={`${open ? "expand" : ""} flex-center flex-column`}
          onClick={closeSidebar}
        >
          <NavButton
            link="/inbox"
            label={"Inbox"}
            title="Inbox mail"
            expand={false}
          >
            <GoInbox size={20} />
          </NavButton>

          <NavButton
            link="/starred"
            label={"Starred"}
            title="Starred mail"
            expand={false}
          >
            <IoStar size={20} />
          </NavButton>

          <NavButton
            link="/outbox"
            label={"Outbox"}
            title="Outbox"
            expand={false}
          >
            <IoSend size={20} />
          </NavButton>

          <NavButton
            link="/drafts"
            label={"Drafts"}
            title="Drafts"
            expand={false}
          >
            <RiDraftFill size={20} />
          </NavButton>

          <NavButton
            link="/spam"
            label={"Spam"}
            title="Spam mail"
            expand={false}
          >
            <RiSpam2Fill size={20} />
          </NavButton>

          <NavButton
            link="/trash"
            label={"Trash"}
            title="Trash"
            expand={false}
          >
            <IoMdTrash size={20} />
          </NavButton>
          
          
          {/* <button className="contact-button" onClick={showContacts}>
            <IoMdContacts size={20} />
            <span>Contacts</span>
          </button> */}
        </nav>
      </aside>
    );
}