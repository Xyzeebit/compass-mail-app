import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function ComposeButton () {
    return (
        <Link to={`/compose`} className="compose-anchor">
            <div className={`compose-button`}>
                <IoPencil size={25} />
                <span>Compose</span>
            </div>
        </Link>
    )
}