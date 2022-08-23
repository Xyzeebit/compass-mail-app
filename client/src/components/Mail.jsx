import { useEffect, useReducer } from "react";
import Contacts from "./Contact-v2";
import List from './List';

export default function Mail({ expand, user, list, label, dispatch }) {
    return (
      <article
        className={`container ${expand ? "expand-container" : "shrink-container"}`}
      >
        <Contacts user={user} />
        <section className="mails">
          
          <List list={list} label={label} dispatch={dispatch} />
        </section>
      </article>
    );
}
