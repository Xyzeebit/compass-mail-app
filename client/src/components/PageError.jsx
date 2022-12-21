import { GoServer } from "react-icons/go";

export default function PageError() {
    return(
        <div className="page-error">
            <div>
                <GoServer size={100} color="#3940a7e0" />
                <p>Connection error</p>
            </div>
        </div>
    )
}