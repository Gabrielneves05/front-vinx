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

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector(state => state.auth);


    return (
        <nav className="nav">
            <Link to="/" className="logo">Vin<span>X</span></Link>

            <div className="nav-right">
                <form className="search-form">
                    <Search size={20} />
                    <input type="text" placeholder="Pesquisar..." />
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
                                <span>Sair</span>
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