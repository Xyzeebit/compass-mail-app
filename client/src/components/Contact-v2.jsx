import { useState } from "react";
import { IoPerson } from "react-icons/io5";

export default function Contacts({ contacts, dispatch }) {
    return (
        <aside className={`contacts`}>
            <div className={`user`}>
                <span>
                    <IoPerson size={25} />
                </span>
            </div>
            <ul>
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