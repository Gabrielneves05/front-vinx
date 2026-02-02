import "./Navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import { 
    Search, 
    House,
    UserRound,
    Camera,
    Menu,
    X
} from "lucide-react";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";
import { resetUserState } from "../slices/userSlice";

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector(state => state.auth);

    const [query, setQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetUserState());
        setMobileMenuOpen(false);
        navigate("/login");
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (query) {
            setMobileMenuOpen(false);
            return navigate(`/search?q=${query}`);
        }
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    return (
        <>
            {mobileMenuOpen && (
                <div 
                    className="mobile-overlay" 
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
            
            <nav className="nav">
                <Link to="/" className="logo">Vin<span>X</span></Link>

                <button 
                    className="mobile-menu-toggle" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`nav-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <form className="search-form" onSubmit={handleSearch}>
                        <Search size={20} />
                        <input 
                            type="text" 
                            placeholder="Pesquisar..." 
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </form>

                    <ul className="nav-links">
                        {auth ? (
                            <>
                                <li>
                                    <NavLink to="/" onClick={closeMobileMenu}>
                                        <House />
                                        <span className="link-text">Início</span>
                                    </NavLink>
                                </li>
                                
                                {user && (
                                    <li>
                                        <NavLink to={`/users/${user._id}`} onClick={closeMobileMenu}>
                                            <Camera />
                                            <span className="link-text">Fotos</span>
                                        </NavLink>
                                    </li>
                                )}

                                <li>
                                    <NavLink to="/profile" onClick={closeMobileMenu}>
                                        <UserRound />
                                        <span className="link-text">Perfil</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <span onClick={handleLogout} className="logout-btn">Sair</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login" onClick={closeMobileMenu}>
                                        Entrar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register" onClick={closeMobileMenu}>
                                        Cadastrar-se
                                    </NavLink>
                                </li>
                            </>
                        )}
                        
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;