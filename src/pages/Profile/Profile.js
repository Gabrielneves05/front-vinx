import "./Profile.css";

import { uploadUrl } from "../../utils/config";

// components
import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import { Eye, Pencil, X } from "lucide-react";

// hooks
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import { 
  publishPhoto, 
  resetMessage, 
  getUserPhotos,
  updatePhoto,
  deletePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.user);
  const { user: userAuth } = useSelector(state => state.auth);
  const { 
    photos, 
    loading: loadingPhoto, 
    message: messagePhoto, 
    error: errorPhoto 
  } = useSelector(state => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // New form edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = e => {
      const image = e.target.files[0];

      setImage(image);
  }

  const resetComponentMessage = () => {
    setTimeout(() => {
        dispatch(resetMessage());
    }, 2000);
  }

  const submitHandle = e => {
    e.preventDefault();

    const photoData = {
      title, 
      image
    }

    // Build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach(key => 
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  }

  // Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  }

  // Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  }

  // Open edit form
  const handleEdit = (photo) => {
    if(editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  }

  const handleCancelEdit = () => {
    hideOrShowForms();
  }

  // Delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          {user.profileImage && (
            <img
              src={`${uploadUrl}/users/${user.profileImage}`}
              alt={user.name}
              className="profile-image"
            />
          )}

          <div className="profile-description">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        </div>

        {id === userAuth._id && (
          <>
            <div className="new-photo" ref={newPhotoForm}>
              <h3>Compartilhe algum momento seu:</h3>
              <form onSubmit={submitHandle}>
                <label>
                    <span>Título para a foto:</span>
                    <input 
                      type="text" 
                      placeholder="Insira um título" 
                      onChange={(e) => setTitle(e.target.value)} 
                      value={title || ""} 
                    />
                </label>
                <label>
                    <span>Imagem:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                {!loadingPhoto && <input type="submit" value="Postar" />}
                {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
              </form>
            </div>

            <div className="edit-photo hide" ref={editPhotoForm}>
              <p>Editar Foto</p>
              {editImage && (
                <img src={`${uploadUrl}/photos/${editImage}`} 
                  alt={editTitle}
                />
              )}

              <form onSubmit={handleUpdate}>
                <input 
                  type="text" 
                  placeholder="Insira um novo título" 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  value={editTitle || ""} 
                />
                <input type="submit" value="Atualizar" />

                <button 
                  className="cancel-btn" 
                  onClick={handleCancelEdit}
                >
                  Cancelar Edição
                </button>
              </form>
            </div>
            {errorPhoto && <Message message={errorPhoto} type="error" />}
            {messagePhoto && <Message message={messagePhoto} type="success" />}
          </>
        )}

        <div className="user-photos-section">
          <h2>Fotos Publicadas</h2>
          
          {photos && photos.length > 0 ? (
            <div className="photos-grid">
              {photos.map((photo) => (
                <div className="photo-card" key={photo._id}>
                  {photo.image && (
                    <div className="photo-image-wrapper">
                      <img 
                        src={`${uploadUrl}/photos/${photo.image}`} 
                        alt={photo.title} 
                      />
                    </div>
                  )}

                  <div className="photo-info">
                    <h3>{photo.title}</h3>
                  </div>

                  {id === userAuth._id ? (
                    <div className="card-actions">
                      <Link to={`/photos/${photo._id}`} className="action-btn view-btn">
                        <Eye size={18} />
                        <span>Ver</span>
                      </Link>
                      <button onClick={() => handleEdit(photo)} className="action-btn edit-btn">
                        <Pencil size={18} />
                        <span>Editar</span>
                      </button>
                      <button onClick={() => handleDelete(photo._id)} className="action-btn delete-btn">
                        <X size={18} />
                        <span>Excluir</span>
                      </button>
                    </div>
                  ) : (
                    <div className="card-footer">
                      <Link className="btn-view-more" to={`/photos/${photo._id}`}>
                        Ver Mais
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-photos">
              <div className="no-photos-content">
                <h3>Ainda não existem fotos publicadas!</h3>
                <p>Compartilhe seus melhores momentos agora!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;