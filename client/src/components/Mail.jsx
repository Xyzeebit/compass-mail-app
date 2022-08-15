import { useEffect, useReducer } from "react";
import Userbar from "./Userbar";

export default function Mail({ expand, user, dispatch }) {
    return (
      <article
        className={`container ${expand ? "expand-container" : "shrink-container"}`}
      >
        <Userbar user={user} dispatch={dispatch} />
      </article>
    );
}
