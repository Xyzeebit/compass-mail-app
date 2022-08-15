import { RiUser2Fill } from "react-icons/ri";

export default function Userbar({ user, dispatch }) {
    return (
      <div>
        <span>
          <RiUser2Fill size={25} color="gray" />
        </span>
        <p>{user.firstName}</p>
      </div>
    );
}