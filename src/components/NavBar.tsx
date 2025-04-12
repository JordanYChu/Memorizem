import { NavLink } from "react-router-dom";

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
            <img id="logo" src="../public/logo.png" alt='logo'></img>
            <ul>
                <NavItem href={"/"} label="Home" />
                <NavItem href={"/speeches"} label="Speeches" />
            </ul>

        </nav>
    )
}

export default NavBar;