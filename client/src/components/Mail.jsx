import { useEffect, useReducer } from "react";
import Compose from "./Compose";
import Contacts from "./Contact-v2";
import List from './List';
import Searchbar from "./SearchBar";

export default function Mail({ loading, user, list, label, dispatch }) {
    return (
      <article
        className={`container`}
      >
        <div className="mails">
          <Searchbar dispatch={dispatch} />
          {loading &&
            <>
              <ul className="mail-skeleton-list">
                <li className="c-skeleton card">
                  <div className="c-image" />
                  <div className="c-group">
                    <div className="c-name" />
                    <div className="c-email" />
                  </div>
                  <div className="c-time" />
                </li>
                <li className="c-skeleton card">
                  <div className="c-image" />
                  <div className="c-group">
                    <div className="c-name" />
                    <div className="c-email" />
                  </div>
                  <div className="c-time" />
                </li>
                <li className="c-skeleton card">
                  <div className="c-image" />
                  <div className="c-group">
                    <div className="c-name" />
                    <div className="c-email" />
                  </div>
                  <div className="c-time" />
                </li>
                <li className="c-skeleton card">
                  <div className="c-image" />
                  <div className="c-group">
                    <div className="c-name" />
                    <div className="c-email" />
                  </div>
                  <div className="c-time" />
                </li>
              </ul>
            </>
          }
          {loading === false && <List list={list} label={label} dispatch={dispatch} />}
          {/* <Compose /> */}
        </div>
      </article>
    );
}
