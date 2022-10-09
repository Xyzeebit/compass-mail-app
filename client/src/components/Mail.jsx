import { useEffect, useReducer } from "react";
import { useQueryMail } from "../hooks";
import Compose from "./Compose";
import Contacts from "./Contact-v2";
import List from './List';
import Searchbar from "./SearchBar";
import combineReducers, { initState } from "../reducer/reducer";

export default function Mail({ username, label, text }) {
  const { loading, error, data } = useQueryMail(username, label, 0);
  const [state, dispatch] = useReducer(combineReducers, initState);
  const { mails } = state;
  const list = mails[label];

  useEffect(() => {
    
    if (error) {
      dispatch({ type: 'FETCH_' + label.toUpperCase(), [label]: [] });
    } else {
      if (data && data.success) {
        dispatch({ type: 'FETCH_' + label.toUpperCase(), [label]: data.messages });
      }
    }
  }, [error, data]);

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
            </> : <List list={list} label={text} dispatch={dispatch} />
          }
          
        </div>
      </article>
    );
}
