import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="login">
            <h1>Vin<span>X</span></h1>
            <h2 className="subtitle">Acesse para ver o que há de novo!</h2>
            <form onSubmit={handleSubmit} className="form-modern">
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
                        placeholder="Digite sua senha" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password || ""} 
                    />
                </div>
                <input type="submit" value="Entrar" className="btn-submit" />
            </form>
            <p>Não possui uma conta? <Link to="/register">Clique aqui</Link></p>
        </div>
    );
}

export default Login;