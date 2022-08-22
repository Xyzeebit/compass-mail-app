import { useState } from "react";
import { IoPerson } from "react-icons/io5";

export default function Contacts({ contacts, dispatch }) {
    return (
        <aside className={`contacts`}>
            <div className={`profile`}>
                <p className="text">Profile</p>
                <span className="avatar">
                    <IoPerson size={40} />
                </span>
                <div className="name">
                    <p>John Doe</p>
                    <button>Add user</button>
                </div>
            </div>
            <ul className="contact-list">
                <li className="contact">
                    <span>
                        <IoPerson size={30} />
                    </span>
                    <div>
                        <h3>John Smith</h3>
                        <p>johnsmith@compass.com</p>
                    </div>
                </li>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
                <li>User 4</li>
                <li>User 5</li>
            </ul>
        </aside>
    )
}

// https://random-data-api.com/api/v2/users?size=2