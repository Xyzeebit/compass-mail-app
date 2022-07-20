import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {
                messages.map(message => (
                    <Message 
                        key={message._id}
                        message={message}
                    />
                ))
            }
        </div>
    );
}

const Message = ({ message }) => {
    const [selected, select] = useState(false);
    const { from, subject, body, created, starred, read } = message;
    let shortBody = '';
    if (body) {
        shortBody = (body.length > 50) ? body.substring(0, 30) : body;
    }
    const handleSelect = evt => {
        select(!selected);
    }
    return (
        <div className="message">
            <div>
                <div className="m-select">
                    <input
                        type="checkbox"
                        value={selected}
                        className="i-checkbox"
                        onChange={handleSelect}
                    />
                </div>
                <div className="m-star mr-2">
                    <IoStar />
                </div>
                <div className="m-from">{from}</div>
            </div>
            <div>
                <div className="m-subject bold">{subject}</div>
                <div className="m-body">{shortBody}</div>
            </div>
            <div className="m-time">{created}</div>
        </div>
    );
}

const date = new Date().toISOString();
function formatTime(time) {
    const t = new Date(time);
    const md = t.toDateString().split(' ');
    const monthAndDate = md[1] + ' ' + md[2];
    const [h, m] = t.toTimeString().split(':');
    const locale = t.toLocaleString().split(' ')[2];
    const now = new Date();
    let formatted = '';
   
    if (now.getFullYear() === t.getFullYear()) {
        if ((now.getHours() - t.getHours()) > 24) {
            formatted = monthAndDate;
        } else {
            formatted = `${h}:${m} ${locale}`;
        }
    } else {
        formatted = `${t.getMonth()} ${t.getFullYear()}`;
    }
    
    return formatted;
}

MessageList.defaultProps = {
    messages: [
        {
            _id: '0',
            from: 'example@mail.com',
            subject: 'New message from mailjet',
            body: `This is to inform your that you can now send messages to more that 150 email servers`,
            starred: false,
            read: false,
            created: formatTime(date)
        },
        {
            _id: '1',
            from: 'example@mail.com',
            subject: 'New message from mailjet',
            body: `This is to inform your that you can now send messages to more that 150 email servers`,
            starred: false,
            read: false,
            created: formatTime(date)
        },
        {
            _id: '2',
            from: 'example@mail.com',
            subject: 'New message from mailjet',
            body: `This is to inform your that you can now send messages to more that 150 email servers`,
            starred: false,
            read: false,
            created: formatTime(date)
        },
        {
            _id: '3',
            from: 'example@mail.com',
            subject: 'New message from mailjet',
            body: `This is to inform your that you can now send messages to more that 150 email servers`,
            starred: false,
            read: false,
            created: formatTime(date)
        }
    ]
};

export default MessageList;