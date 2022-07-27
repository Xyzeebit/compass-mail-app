import { useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io';


export default function Message({ message, dispatch }) {
    const { id, type, sender, subject, body, time } = message;
    return (
        <a href={'/' + type + '/' + id} rel={"noopener"} title={subject}>
            <Icon id={id} type={ type } sender={sender} dispatch={dispatch} />
            <article>
                <h2>{subject}</h2>
                <p>{body}</p>
            </article>
            <Time time={time} />
      </a>
    );
}

const Time = ({ time }) => {
    const now = new Date();
    const ago = new Date(time);
    const value = '09:23AM';
    return (
        <p>{value}</p>
    )
}

const Icon = ({ id, type, sender, dispatch }) => {
    const [marked, setMarked] = useState(false);
    const firstLetter = sender.substring(0, 1).toUpperCase();
    const markMessage = () => {
        setMarked(!marked);
        dispatch({ type: 'MARKED', location: type, id })
    }
    return (
        <button onClick={markMessage}>
            {marked ? <IoMdCheckmark size={20} /> : <span>{firstLetter}</span>}
        </button>
    )
}