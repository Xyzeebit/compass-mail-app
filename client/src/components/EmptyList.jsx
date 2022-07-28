import { IoMailOpenSharp } from "react-icons/io5"

export default function EmptyList({ text }) {
    return (
        <div className="empty-list">
            <IoMailOpenSharp color="#666" />
            <p>{text}</p>
        </div>
    )
}