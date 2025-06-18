import "./Auth.css";

// Components
import { Link } from "react-router-dom";

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
        <div className="register">
            <h1>Vin<span>X</span></h1>
            <h2 className="subtitle">Crie sua conta</h2>
            <form onSubmit={handleSubmit} className="form-modern">
                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        placeholder="Digite seu nome" 
                        onChange={e => setName(e.target.value)} 
                        value={name || ""} 
                    />
                </div>
                <div className="form-group">
                    <label>E-mail</label>
                    <input 
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email || ""} 
                    />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input 
                        type="password" 
                        placeholder="Crie uma senha" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password || ""}
                    />
                </div>
                <div className="form-group">
                    <label>Confirme sua senha</label>
                    <input 
                        type="password" 
                        placeholder="Confirme sua senha" 
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword || ""}
                    />
                </div>
                <input type="submit" value="Cadastrar" className="btn-submit" />
            </form>
            <p>Já possui uma conta? <Link to="/login">Entrar</Link></p>
        </div>
    )
}

export default Register;