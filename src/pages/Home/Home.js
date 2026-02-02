import "./Home.css";

// Components
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector(state => state.auth);
    const { photos, loading } = useSelector(state => state.photo);

    // Load all photos
    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    // Like a photo
    const handleLike = (photo) => {
        dispatch(like(photo._id));

        resetMessage();
    }

    if(loading) {
        return <Loading />;
    }

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="feed-header">
                    <h1>Feed de Publicações</h1>
                    <p>Descubra e compartilhe momentos incríveis</p>
                </div>

                {photos && Array.isArray(photos) && photos.length > 0 ? (
                    <div className="photos-grid">
                        {photos.map(photo => (
                            <div key={photo._id} className="photo-card">
                                <PhotoItem photo={photo} />
                                <LikeContainer 
                                    photo={photo} 
                                    user={user} 
                                    handleLike={handleLike} 
                                />
                                <div className="card-footer">
                                    <Link className="btn-view-more" to={`/photos/${photo._id}`}>
                                        Ver Mais
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-photos">
                        <div className="no-photos-content">
                            <h2>Ainda não existem fotos publicadas</h2>
                            <p>Seja o primeiro a compartilhar suas memórias!</p>
                            <Link to={`/users/${user._id}`} className="btn-first-photo">
                                Publicar Primeira Foto
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;