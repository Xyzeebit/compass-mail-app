import { useState } from "react";

import "../styles/header.css";
import logo from "../images/logo.png";
import { IoSearch } from "react-icons/io5";
import { RiEqualizerFill } from "react-icons/ri";

export default function Header({ dispatch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (evt) => {
    evt.preventDefault();
    alert(searchInput);
    setSearchInput("");
  };
  return (
    <header>
      <button
        className="toggle-sidebar"
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      >
        <div />
        <div />
        <div />
      </button>
      <div className="brand" aria-label="Compass mail">
        <img
          src={logo}
          alt="Compass logo featuring a red envelope"
          width="50"
          height="50"
        />
        <h1>COMPASS</h1>
      </div>

      <div className="search-box">
        <form onSubmit={handleSearch}>
          <div>
            <IoSearch color="#666" size={25} />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
            placeholder="Search mail..."
          />
          <button>
            <RiEqualizerFill color="#666" size={20} />
          </button>
        </form>
        <div className="suggestion-box">

        </div>
      </div>
    </header>
  );
}
