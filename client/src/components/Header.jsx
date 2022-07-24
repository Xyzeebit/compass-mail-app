import { useState } from 'react'

import '../styles/header.css';
import logo from '../mailbox-logo.png';
import { IoSearch } from 'react-icons/io5';
import { RiEqualizerFill } from 'react-icons/ri';

export default function Header({ dispatch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (evt) => {
        evt.preventDefault();
    }
    return (
        <header>
            <button className='toggle-sidebar'
                onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            >
                <div />
                <div />
                <div />
            </button>
            <div className='brand' title='Packmail brand name'>
                <img
                    src={logo}
                    alt='Packmail logo featuring a red envelope'
                    width="50"
                    height="50"
                />
                <h1>PACKMAIL</h1>
            </div>

            <form onSubmit={handleSearch}>
                <div>
                    <IoSearch size={25} />
                </div>
                <input
                    type='text'
                    value={searchInput}
                    onChange={({ target }) => setSearchInput(target.value)}
                    placeholder="Search mail..."
                />
                <button>
                    <RiEqualizerFill size={25} />
                </button>
            </form>
        </header>
    );
}