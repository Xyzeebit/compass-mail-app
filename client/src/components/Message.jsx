import { useState } from "react";
import { GoCheck } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Message({ message, dispatch }) {
  const { id, type, sender, subject, body, time, isMarked, isNew } = message;
  return (
    <li className="mail-item" title={subject}>
      <Icon id={id} type={type} isMarked={isMarked} sender={sender} dispatch={dispatch} />
      <Link to={"/" + type + "/" + id}>
        <div className="message-summary">
          <h2>{sender}</h2>
          <h3>{subject}</h3>
          <p>{body}</p>
        </div>
        <div className="time-and--badge">
          <Time time={time} />
          {isNew && <Badge label="New" />}
        </div>
      </Link>
    </li>
  );
}

const Badge = ({ label }) => {
  return <p className="badge">{label}</p>
}

const Time = ({ time }) => {
  const now = new Date();
  const ago = new Date(time);
  let value = "";
  now.setDate((new Date().getDate() + 1));
  const ndate = new Date(ago.getTime());
  ndate.setDate(ndate.getDate() + 1);
  
  if (now.getTime() < ago.getTime()) {
    value = ago.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  } else {
    value = ago.toLocaleString('en-US', { month: 'short', day: 'numeric' }).replace(' ', '/');
  }
  return <p className="time">{value}</p>;
};

const Icon = ({ id, sender, isMarked, dispatch }) => {
  const firstLetter = sender.substring(0, 1).toUpperCase();
  const colors = ['#d4793d', '#8abcdb', '#2140db', '#479167', '#cfd66f'];
  const markMessage = (evt) => {
    evt.preventDefault();
    dispatch({ type: "TOGGLE_MARK", id });
  };
  return (
    <div className={`${isMarked ? "flipped" : ""} icon`} onClick={markMessage}>
      <div className="side front">
        <GoCheck color="#fff" size={25} />
      </div>
      <div className="side back" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)], color: '#210a1e' }}>
        <span>{firstLetter}</span>
      </div>
    </div>
  );
};
