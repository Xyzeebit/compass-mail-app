import { useState } from "react";
import { IoPerson } from "react-icons/io5";


export default function Searchbar({ photo, dispatch }) {
    const [value, setValue] = useState('');
    function handleSubmit(evt) {
        evt.preventDefault();
    }
    function handleClick() {

    }
    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <button type="button" className="user-button lg-none" onClick={handleClick}>
                    {photo ?
                        <img src={photo} alt="open user sidebar" width="45" height="45" className="user-bar" /> :
                        <IoPerson size={28} />}
                </button>
                <input type={'text'} value={value} onChange={() => setValue} placeholder="Search mail..." />
            </form>
        </div>
    )
}