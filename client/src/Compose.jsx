import React, { useState } from 'react';

import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';

const Compose = ({ visible }) => {
    const [minimized, setMinimize] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isVisible, setVisible] = useState(true);
    const [message, setMessage] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const handleToChange = ({ target }) => {
        setMessage({ ...message, to: target.value });
    }
    const handleSubjectChange = ({ target }) => {
        setMessage({ ...message, subject: target.value });
    }
    const handleBodyChange = ({ target }) => {
        setMessage({ ...message, body: target.value });
    }
    const handleSaveMessage = () => {

    }
    const handleSubmit = e => {
        e.preventDefault();
        alert(`${message.to} : ${message.body}`);
    }
    const toggleMinimized = () => {
        setMinimize(!minimized);
    }
    const handleExpand = expand => {
        setExpanded(expand);
    }
    const handleClose = () => {
        setVisible(false)
    }
    if (isVisible) {
        // console.log(isVisible, visible)
        return (
            <div className="compose-container" style={{ display: `${minimized ? 'none' : 'block'}` }}>
                <div >
                    <button onClick={toggleMinimized}>_</button>
                    {expanded
                        ?
                        <button onClick={() => handleExpand(false)}><FiMinimize2 /></button>
                        : <button onClick={() => handleExpand(true)}><FiMaximize2 /></button>
                    }
                    <button onClick={handleClose}>X</button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="input-to">To
                            <input
                                type="text"
                                id="input-to"
                                value={message.to}
                                className="input-to"
                                onChange={handleToChange}
                            />
                        </label>
                        <label htmlFor="input-subject">Subject
                            <input
                                type="text"
                                id="input-subject"
                                value={message.subject}
                                className="input-subject"
                                onChange={handleSubjectChange}
                            />
                        </label>
                        <label htmlFor="input-body">Body</label>
                        <textarea
                            id="input-body"
                            value={message.body}
                            className="input-body"
                            onChange={handleBodyChange}
                        />
                        <div className="control-buttons">
                            <input
                                type="button"
                                value="Save"
                                className="save-button"
                                id="save-button"
                                onClick={handleSaveMessage}
                            />
                            <input
                                type="submit"
                                value="send"
                                className="submit-button"
                                id="submit-button"
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    return null;
}

export default Compose;


// collabse=FiMinimize2
// expand=FiMaximize2
// inbox=GoInbox
// sent=IoSend
// drafts=RiDraftFill
// trash=IoMdTrash
// spam=RiSpam2Fill
// save=IoSave
// search=AiOutlineSearch
// setting=GoSettings
// emoji=MdOutlineEmojiEmotions
// user=FaUserCircle
// adduser=BiUserPlus
// caretdown=AiFillCaretDown | AiOutlineDown | AiOutlineDownload
// add=GoDiffAdded