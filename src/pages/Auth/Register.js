import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="auth-container">
            <h1>VinX</h1>
            <p className="subtitle">Crie sua conta</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" />
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirme sua senha" />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já possui uma conta? <Link to="/login">Entrar</Link></p>
        </div>
    )
}

export default Register;