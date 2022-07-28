import { useState, useEffect } from 'react'

import { IoStarSharp } from "react-icons/io5";
import { IoMdTrash } from 'react-icons/io';
import { IoShareSocial } from 'react-icons/io5';
import { GoStar } from 'react-icons/go';
import Message from "./Message";

export default function List({ list, marked, dispatch }) {
    return (
        <>
            {<Actions marked={() => {
                return list.filter(i => i.isMarked === true )
            } } dispatch={dispatch} />}
            {list.map((message) => {
                return (
                  <Message
                    message={message}
                    dispatch={dispatch}
                    key={message.id}
                  />
                );
            }
            )}
        </>
    )
}

const Actions = ({ marked, dispatch }) => {
    const STAR = 0, SHARE = 1, DELETE = 2;
    const [action, setAction] = useState(-1);


    const starMarked = () => {
        setAction(STAR);
        dispatch({ type: 'EMPTY_MARKED' });
    }
    const deleteMarked = () => {
        setAction(DELETE);
        dispatch({ type: "EMPTY_MARKED" });
    }
    const shareMarked = () => {
        setAction(SHARE);
        dispatch({ type: "EMPTY_MARKED" });
    }

    useEffect(() => {
        async function takeAction (whatAction){
            switch (action) {
                case DELETE:
                    // perform gql delete mutation
                    break;
                case STAR:
                    // perform a gql star mutation
                    break;
                case SHARE:
                    // forward mail
                    break;
                default:
                    break;
            }
        }
        if (action > -1) {
            takeAction(action);
        }
    }, [action]);

    return (
      <article className={`marked ${marked().length > 0 ? "show-marked" : ""}`}>
        <p>{marked() ? marked().length : 0} items selected</p>

        <button onClick={deleteMarked} title="Delete all selections">
          <IoMdTrash size={25} />
        </button>
        <button onClick={starMarked} title="Star selections">
          <GoStar size={25} />
        </button>
        <button onClick={shareMarked} title="Share selections">
          <IoShareSocial size={25} />
        </button>
      </article>
    );
}