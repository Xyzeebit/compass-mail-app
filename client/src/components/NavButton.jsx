import { NavLink } from 'react-router-dom';

const NavButton = ({ label, link, title, expand, children }) => {
    return (
      <NavLink
        to={link}
        title={title || label}
        className={({ isActive }) =>
          isActive
            ? `active ${expand ? "expand" : ""}`
            : `${expand ? "expand" : ""}`
        }
      >
        <div>{children}</div>
        <p>{label}</p>
      </NavLink>
    );
}

export default NavButton;