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
import { publishPhoto, resetMessage, getUserPhotos } from "../../slices/photoSlice";

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

    setTimeout(() => {
        dispatch(resetMessage());
    }, 2000);
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
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
                    placeholder=" Insira um título" 
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
          {errorPhoto && <Message message={errorPhoto} type="error" />}
          {messagePhoto && <Message message={messagePhoto} type="success" />}
        </>
      )}

      <div className="user-photos">
        <h2>Fotos Publicadas</h2>
        <div className="photos-container">
          {photos && photos.map((photo) => (
            <div className="photo" key={photo._id}>
              {photo.image && (
                <img 
                  src={`${uploadUrl}/photos/${photo.image}`} 
                  alt={photo.title} 
                />
              )}

              {id === userAuth._id ? (
                <p>Actions</p>
              ) : (<Link className="btn" to={`/photos${photo._id}`}>Ver</Link>)}
            </div>
          ))}

          {photos.length === 0 && <p>Ainda não existem fotos publicadas!</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;