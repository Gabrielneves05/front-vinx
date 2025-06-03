import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        };

        console.log(user);
    }

    return (
        <div className="register">
            <h1>Vin<span>X</span></h1>
            <p className="subtitle">Crie sua conta</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    onChange={e => setName(e.target.value)} 
                    value={name || ""} 
                />
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    onChange={e => setEmail(e.target.value)} 
                    value={email || ""} 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    onChange={e => setPassword(e.target.value)} 
                    value={password || ""}
                />
                <input 
                    type="password" 
                    placeholder="Confirme sua senha" 
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword || ""}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já possui uma conta? <Link to="/login">Entrar</Link></p>
        </div>
    )
}

export default Register;