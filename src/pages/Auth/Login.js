import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                
                {!loading && <input type="submit" value="Entrar" className="btn-submit" />}
                {loading && <input type="submit" value="Aguarde..." className="btn-submit" disabled/>}
                {error && <Message message={error} type="error" />}
            </form>
            <p>Não possui uma conta? <Link to="/register">Clique aqui</Link></p>
        </div>
    );
}

export default Login;