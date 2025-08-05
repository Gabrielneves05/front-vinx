import './EditProfile.css';

import { uploadUrl } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

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
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async e => {
        e.preventDefault();
        
        // Gather user data from states
        const userData = {
            name,
        };

        if(profileImage) {
            userData.profileImage = profileImage;
        }

        if(bio) {
            userData.bio = bio;
        }

        if(password) {
            userData.password = password;
        }

        // Build form data
        const formData = new FormData();

        Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key])
        );

        // Send formData
        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    const handleFile = e => {
        const image = e.target.files[0];
        setPreviewImage(image);
        setProfileImage(image);
    }

    return (
        <div className="edit-profile">
            <h1>Vin<span>X</span></h1>
            <h2>Edite seus dados de perfil</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte-nos sobre você!</p>

            <form onSubmit={handleSubmit} className="form-modern">
                <div className="form-group image-preview-group">
                    {(user.profileImage || previewImage) && (
                        <img
                            className="profile-image"
                            src={
                                previewImage
                                    ? URL.createObjectURL(previewImage)
                                    : `${uploadUrl}/users/${user.profileImage}`
                            }
                            alt={user.name}
                        />
                    )}
                </div>
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
                        onChange={handleFile}
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
                {!loading && <input type="submit" value="Atualizar" className="btn-submit" />}
                {loading && <input type="submit" value="Aguarde..." className="btn-submit" disabled />}
                {error && <Message message={error} type="error" />}
                {message && <Message message={message} type="success" />}
            </form>
        </div>
    );
};

export default EditProfile;