import { useState } from "react";
import { IoPerson } from "react-icons/io5";


export default function Searchbar({ dispatch }) {
    const [value, setValue] = useState('');
    function handleSubmit(evt) {
        evt.preventDefault();
    }
    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type={'text'} value={value} onChange={() => setValue} placeholder="Search mail..." />
            </form>
        </div>
    )
}