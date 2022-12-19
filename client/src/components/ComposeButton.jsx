import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function ComposeButton () {
    return (
        <Link to={`/compose`}>
            <div className={`compose-button`}>
                <IoPencil />
                <span>Compose</span>
            </div>
        </Link>
    )
}