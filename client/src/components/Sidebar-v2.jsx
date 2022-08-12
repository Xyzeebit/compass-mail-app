import logo from '../images/logo-w.png';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from "../styles/sidebar.css";
import compose_image from "../compose-icon.png";
import { GoInbox } from "react-icons/go";
import { IoMdContact, IoMdContacts, IoMdExpand, IoMdMenu, IoMdTrash } from "react-icons/io";
import { IoExpand, IoExpandSharp, IoMenu, IoSend, IoStar } from "react-icons/io5";

// IoMdContact
import { RiDraftFill, RiSpam2Fill } from "react-icons/ri";
import NavButton from './NavButton';



export default function Sidebar({ sidebar, dispatch }) {
    const navigate = useNavigate();
  // const [expand, setExpand] = useState(false);
    const { open, expand, dropdown } = sidebar;

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
      <aside className="sidebar" style={{ }}>
        <img
          src={logo}
          alt="Compass Logo"
          width="50"
          height="50"
          className="spin sidebar-logo"
        />

        <h1 className='app-title'>Compass</h1>

        <button
          className='expand-button flex-center'
          title={expand ? 'Collapse menu' : 'Expand menu'}
          onClick={() => dispatch({ type: 'EXPAND' })}>
          <IoMdExpand size={20} />
        </button>

        <button className={`mb-sideber-button`} onClick={() => dispatch({ type: 'EXPAND'})}>
          <IoMdMenu size={25} />
        </button>

        <nav
          className={`${open ? "expand" : ""} flex-center flex-column`}
          onClick={closeSidebar}
        >
          <NavButton
            link="/inbox"
            label={"Inbox"}
            title="Inbox mail"
            expand={expand}
          >
            <GoInbox size={20} />
          </NavButton>

          <NavButton
            link="/starred"
            label={"Starred"}
            title="Starred mail"
            expand={expand}
          >
            <IoStar size={20} />
          </NavButton>

          <NavButton
            link="/outbox"
            label={"Outbox"}
            title="Outbox"
            expand={expand}
          >
            <IoSend size={20} />
          </NavButton>

          <NavButton
            link="/drafts"
            label={"Drafts"}
            title="Drafts"
            expand={expand}
          >
            <RiDraftFill size={20} />
          </NavButton>

          <NavButton
            link="/spam"
            label={"Spam"}
            title="Spam mail"
            expand={expand}
          >
            <RiSpam2Fill size={20} />
          </NavButton>

          <NavButton
            link="/trash"
            label={"Trash"}
            title="Trash"
            expand={expand}
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