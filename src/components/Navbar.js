import "./Navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import { 
    Search, 
    House,
    UserRound,
    Camera,
} from "lucide-react";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector(state => state.auth);

    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    }

    return (
        <nav className="nav">
            <Link to="/" className="logo">Vin<span>X</span></Link>

            <div className="nav-right">
                <form className="search-form" onSubmit={handleSearch}>
                    <Search size={20} />
                    <input type="text" placeholder="Pesquisar..." onChange={(e) => setQuery(e.target.value)} />
                </form>

                <ul className="nav-links">
                    {auth ? (
                        <>
                            <li>
                                <NavLink to="/">
                                    <House />
                                </NavLink>
                            </li>
                            
                            {user && (
                                <li>
                                    <NavLink to={`/users/${user._id}`}>
                                        <Camera />
                                    </NavLink>
                                </li>
                            )}

                            <li>
                                <NavLink to="/profile">
                                    <UserRound />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={handleLogout}>Sair</span>
                            </li>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;