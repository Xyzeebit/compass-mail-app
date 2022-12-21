import { IoCloudCircle } from "react-icons/io5";

export default function PageError() {
    return(
        <div className="page-error">
            <div>
                <IoCloudCircle size={30} />
                <p>Connection error</p>
            </div>
        </div>
    )
}