import { useEffect, useReducer } from "react";
import Contacts from "./Contact-v2";
import Userbar from "./Userbar";

export default function Mail({ expand, user, dispatch }) {
    return (
      <article
        className={`container ${expand ? "expand-container" : "shrink-container"}`}
      >
        {/* <Userbar user={user} dispatch={dispatch} /> */}
        <Contacts />
      </article>
    );
}
