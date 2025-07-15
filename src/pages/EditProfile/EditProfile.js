import './EditProfile.css';

// Components
import Message from "../../components/Message/Message";

// Hooks
import { useState } from "react";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        // lógica de envio aqui
    };

    return (
        <div className="edit-profile">
            <h1>Vin<span>X</span></h1>
            <h2 className="subtitle">Edite seus dados de perfil</h2>
            <form onSubmit={handleSubmit} className="form-modern">
                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Digite seu e-mail"
                        value="email@exemplo.com"
                        disabled 
                    />
                </div>
                <div className="form-group">
                    <label>Imagem do Perfil</label>
                    <input 
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <input 
                        type="text" 
                        placeholder="Descrição do perfil"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nova senha</label>
                    <input 
                        type="password" 
                        placeholder="Digite sua nova senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Atualizar" className="btn-submit" />
            </form>
        </div>
    );
};

export default EditProfile;