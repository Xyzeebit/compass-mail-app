import { useEffect, useReducer } from "react";
import Compose from "./Compose";
import Contacts from "./Contact-v2";
import List from './List';
import Searchbar from "./SearchBar";

import { queryType } from '../queries';
import { useQueryData } from '../hooks/fetch-data';

export default function Mail({ user, list, label, emptyMessage, dispatch }) {
  const { loading, error, data } = useQueryData(queryType[label], {
    variables: { username: user.username, page: 0 }
  }, label);

    return (
      <article
        className={`container`}
      >
        <div className="mails">
          <Searchbar dispatch={dispatch} />
          {loading ?
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
            </> : <List list={list} label={emptyMessage} dispatch={dispatch} />
          }
          
        </div>
      </article>
    );
}
