import { NavLink } from 'react-router-dom';

const NavButton = ({ label, link, title, children }) => {
    return (
        <NavLink to={link} title={title || label} className={({ isActive }) => (isActive ? "active" : "")}>
            <div>{children}</div>
            <p>{label}</p>
        </NavLink>
    )
}

export default NavButton;