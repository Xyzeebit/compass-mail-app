import { useState } from "react";
import { GoCheck } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Message({ message, dispatch }) {
  const { id, type, sender, subject, body, time, isMarked } = message;
  return (
    <article className="mail-head" title={subject}>
      <Icon id={id} type={type} isMarked={isMarked} sender={sender} dispatch={dispatch} />
      <Link to={"/" + type + "/" + id} rel="noopener">
        <div className="message-summary">
          <h2>{sender}</h2>
          <h3>{subject}</h3>
          <p>{body}</p>
        </div>
        <Time time={time} />
      </Link>
    </article>
  );
}

const Time = ({ time }) => {
  const now = new Date();
  const ago = new Date(time);
    let value = "";
    let next = now.setHours() + 24;
  if (next > ago) {
    value = ago.toLocaleDateString();
  } else {
    const [h, m] = ago.toTimeString().split(":");
    value = `${h}:${m}`;
  }
  return <p className="time">{value}</p>;
};

const Icon = ({ id, type, sender, isMarked, dispatch }) => {
  const firstLetter = sender.substring(0, 1).toUpperCase();
  const markMessage = (evt) => {
    evt.preventDefault();
    dispatch({ type: "TOGGLE_MARK", id });
  };
  return (
    <div className={`${isMarked ? "flipped" : ""} icon`} onClick={markMessage}>
      <div className="side front">
        <GoCheck color="#fff" size={25} />
      </div>
      <div className="side back"><span>{firstLetter}</span></div>
    </div>
  );
};
