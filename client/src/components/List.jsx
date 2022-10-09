import { useState, useEffect, memo } from 'react'

import { IoMdTrash } from 'react-icons/io';
import { IoShareSocial, IoClose } from "react-icons/io5";
import { GoStar } from 'react-icons/go';
import Message from "./Message";
import EmptyList from './EmptyList';

export default function List({ list, type, label, dispatch }) {
    return (
        <ul className="mail-list">
            {list && <Actions type={type} marked={() => {
                return list.filter(i => i.isMarked === true )
            }} dispatch={dispatch} />}
           
            {(list && list.length > 0) ?
                (list.map((message) => {
                return (
                  <Message
                    message={message}
                    dispatch={dispatch}
                    key={message.id}
                  />
                );
            })) : ( <EmptyList text={label} /> )
        }
        </ul>
    )
}

const Actions = ({ type, marked, dispatch }) => {
    const STAR = 0, SHARE = 1, DELETE = 2;
    const [action, setAction] = useState(-1);


    const starMarked = () => {
        setAction(STAR);
        dispatch({ type: 'EMPTY_MARKED' });
    }
    const deleteMarked = () => {
        setAction(DELETE);
        dispatch({ type: "DELETE_MARKED" });
    }
    const shareMarked = () => {
        setAction(SHARE);
        dispatch({ type: "EMPTY_MARKED" });
    }
    const clearMarked = () => {
        dispatch({ type: 'EMPTY_MARKED', label: type });
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

        <button onClick={clearMarked} title="Clear selections">
          <IoClose size={25} />
        </button>

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

