import './EditProfile.css';

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message/Message";

const EditProfile = () => {
    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // Loading user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // Fill form with user data
    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, []);

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
                        value={name || ""}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Digite seu e-mail"
                        value={email || ""}
                        disabled 
                    />
                </div>
                <div className="form-group">
                    <label>Imagem do Perfil</label>
                    <input 
                        type="file"
                        onChange={e => setProfileImage(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <input 
                        type="text" 
                        placeholder="Descrição do perfil"
                        value={bio || ""}
                        onChange={e => setBio(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nova senha</label>
                    <input 
                        type="password" 
                        placeholder="Digite sua nova senha"
                        value={password || ""}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Atualizar" className="btn-submit" />
            </form>
        </div>
    );
};

export default EditProfile;