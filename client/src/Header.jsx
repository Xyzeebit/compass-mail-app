import React, { useState } from 'react';

import logo from './mailbox-logo.png';

import { GoSettings } from 'react-icons/go';
import { AiOutlineSearch } from 'react-icons/ai';
const Header = () => {
    const [value, setValue] = useState('');
    const handleChange = ({ target }) => {
        setValue(target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // perform query
        alert(value)
        setValue('');
    }
    return (
        <div className="header">
            <button className="menu-button">&#9776;</button>
            <img src={logo} alt="Mail Box Logo" className="logo" />
            <div className="header-text">Mail Box</div>
            <form
                className="search-form"
                onSubmit={handleSubmit}
            >
                <div className="search-form-control">
                    <div className="search-icon"><AiOutlineSearch /></div>
                    <input
                        type="text"
                        className="search-input"
                        value={value}
                        onChange={handleChange}
                        placeholder="search mail"
                    />
                    <div className="settings-icon"><GoSettings /></div>
                </div>
            </form>
        </div>
    );
}

export default Header;