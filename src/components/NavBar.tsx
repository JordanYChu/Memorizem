import { NavLink } from "react-router-dom";
import logo from "/public/logo.svg"

interface NavProps {
    href: string;
    label: string;
}

const NavItem = ({ href, label }: NavProps) => {
    return (
        <li>
            <NavLink to={href}>{label}</NavLink>
        </li>
    )
}

const NavBar = () => {
    return (
        <nav>
            <img id="logo" src={logo} alt='logo'></img>
            <ul>
                <NavItem href={"/"} label="Home" />
            </ul>

        </nav>
    )
}

export default NavBar;