import { useState } from "react";
import { IoPerson } from "react-icons/io5";



export default function Userbar({ user, dispatch }) {
    return (
        <div>
            <div className="userbar-header">
                <h1 className="u-app-title">Compass</h1>
                <Searchbar dispatch={dispatch} />
                {user.photo ?
                <img
                    src={user.photo}
                    alt={`${user.firstname} profile`}
                    width="40"
                    height="40"
                /> :
                (<button className="btn-photo">
                    <IoPerson size={25} color="gray" />
                </button>)}
            </div>
            <div>
                
            </div>
        </div>
    );
}

function Searchbar({ dispatch }) {
    const [value, setValue] = useState('');
    function handleSubmit(evt) {
        evt.preventDefault();
    }
    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type={'text'} value={value} onChange={() => setValue} />
            </form>
        </div>
    )
}