import { useState, useEffect } from 'react'

import { IoShare, IoStar, IoTrashBin } from "react-icons/io5";
import Message from "./Message";

export default function List({ list, marked, dispatch }) {
    return (
        <>
            {marked && <Actions marked={ marked } dispatch={dispatch} />}
            {list.map((message) => 
                <Message message={message} dispatch={dispatch} key={message.id} />
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
      <article>
        <p>{marked.length} selected</p>

        <button onClick={deleteMarked}>
          <IoTrashBin size={20} />
        </button>
        <button onClick={starMarked}>
          <IoStar size={20} />
        </button>
        <button onClick={shareMarked}>
          <IoShare size={20} />
        </button>
      </article>
    );
}