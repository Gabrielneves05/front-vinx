import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Icons
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { register, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    const { loading, error } = useSelector(state => state.auth);

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        };

        console.log(user);

        dispatch(register(user));
    }

    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className="auth-container">
            <div className="auth-card register">
                <div className="auth-header">
                    <h1>Vin<span>X</span></h1>
                    <h2 className="subtitle">Crie sua conta</h2>
                </div>
                <form onSubmit={handleSubmit} className="form-modern">
                    <div className="form-group">
                        <label>Nome</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="Digite seu nome" 
                                onChange={e => setName(e.target.value)} 
                                value={name || ""} 
                            />
                        </div>
                    </div>
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
                                placeholder="Crie uma senha" 
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
                    <div className="form-group">
                        <label>Confirme sua senha</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirme sua senha" 
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmPassword || ""}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    {error && <Message message={error} type="error" />}
                    {!loading && <button type="submit" className="btn-submit">Cadastrar</button>}
                    {loading && <button type="submit" className="btn-submit" disabled>Aguarde...</button>}
                </form>
                <p className="auth-footer">Já possui uma conta? <Link to="/login">Entrar</Link></p>
            </div>
        </div>
    )
}

export default Register;