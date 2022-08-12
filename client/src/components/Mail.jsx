import { useEffect, useReducer } from "react";

export default function Mail({ expand }) {
    return (
      <article
        className={`container ${expand ? "expand-container" : "shrink-container"}`}
      ></article>
    );
}
