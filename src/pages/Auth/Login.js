import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Icons
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const { loading, error } = useSelector(state => state.auth);

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            email,
            password
        }

        dispatch(login(user));
    }

    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className="auth-container">
            <div className="auth-card login">
                <div className="auth-header">
                    <h1>Vin<span>X</span></h1>
                    <h2 className="subtitle">Acesse para ver o que há de novo!</h2>
                </div>
                <form onSubmit={handleSubmit} className="form-modern">
                    <div className="form-group">
                        <label>E-mail</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input 
                                type="email" 
                                placeholder="Digite seu e-mail" 
                                onChange={e => setEmail(e.target.value)} 
                                value={email || ""} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha" 
                                onChange={e => setPassword(e.target.value)} 
                                value={password || ""} 
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    {error && <Message message={error} type="error" />}
                    {!loading && <button type="submit" className="btn-submit">Entrar</button>}
                    {loading && <button type="submit" className="btn-submit" disabled>Aguarde...</button>}
                </form>
                <p className="auth-footer">Não possui uma conta? <Link to="/register">Clique aqui</Link></p>
            </div>
        </div>
    );
}

export default Login;