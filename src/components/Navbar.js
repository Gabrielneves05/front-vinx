import "./Navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import { 
    Search, 
    House,
    UserRound,
    Camera,
} from "lucide-react";

const Navbar = () => {
    return (
        <nav className="nav">
            <Link to="/" className="logo">VinX</Link>

            <div className="nav-content">
                <form className="search-form">
                    <Search 
                        className="search-icon" 
                        size={20}
                    />
                    <input type="text" placeholder="Pesquisar..." />
                </form>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/">
                            <House />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            Cadastrar-se
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;