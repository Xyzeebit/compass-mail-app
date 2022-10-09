import { GoTrashcan } from "react-icons/go"
import { IoMailOpenSharp } from "react-icons/io5"

export default function EmptyList({ text }) {
    if (text.toLowerCase() === 'empty') {
        return (
            <div className="empty-list">
                <GoTrashcan color="#3940a7e0" size={200} />
                <h1>{text}</h1>
            </div>
        );
    }
    return (
        <div className="empty-list">
            <IoMailOpenSharp color="#3940a7e0" size={200} />
            <h1>{text}</h1>
        </div>
    )
}