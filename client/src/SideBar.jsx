import React, { useState } from 'react';

import compose_icon from './compose-icon.png'

import { GoInbox } from 'react-icons/go';
import { IoMdTrash } from 'react-icons/io';
import { IoSend, IoStar} from 'react-icons/io5';
import { RiDraftFill, RiSpam2Fill } from 'react-icons/ri';

const SideBar = ({handleCompose}) => {
    const [item, setItem] = useState(0);
    
    return (
        <div className="sidebar">
            <button className="compose-button" onClick={handleCompose}>
                <img src={compose_icon} className="compose-icon" alt="compose mail" />
                <span>Compose</span>
            </button>
            <ul className="sidebar-items">
                <li className={item === 0 ? "sidebar-item-active" : ''} 
                    onClick={() => setItem(0)}
                >
                    <span><GoInbox /></span>Inbox
                </li>
                <li
                    className={item === 1 ? "sidebar-item-active" : ''}
                    onClick={() => setItem(1)}
                >
                    <span><IoStar /></span>Starred
                </li>
                <li className={item === 2 ? "sidebar-item-active" : ''}
                    onClick={() => setItem(2)}
                >
                    <span><IoSend /></span>Sent
                </li>
                <li className={item === 3 ? "sidebar-item-active" : ''}
                    onClick={() => setItem(3)}
                >
                    <span><RiDraftFill /></span>Drafts
                </li>
                <li className={item === 4 ? "sidebar-item-active" : ''}
                    onClick={() => setItem(4)}
                >
                    <span><RiSpam2Fill /></span>Spam
                </li>
                <li className={item === 5 ? "sidebar-item-active" : ''}
                    onClick={() => setItem(5)}
                >
                    <span><IoMdTrash /></span>Trash
                </li>
            </ul>
        </div>
    );
}

export default SideBar;