import "./Search.css";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

// Components
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

// Redux
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector(state => state.auth);
    const { photos, loading } = useSelector(state => state.photo);

    // Load all photos
    useEffect(() => {
        dispatch(searchPhotos(search));
    }, [dispatch, search]);

    // Like a photo
    const handleLike = (photo) => {
        dispatch(like(photo._id));

        resetMessage();
    }

    if(loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="search-container">
            <div className="search-content">
                <div className="search-header">
                    <h1>Resultados da Busca</h1>
                    <p>Você está buscando por: <strong>{search}</strong></p>
                </div>

                {photos && Array.isArray(photos) && photos.length === 0 && (
                    <div className="no-photos">
                        <h2>Não foram encontrados resultados para a sua busca...</h2>
                    </div>
                )}

                <div className="search-results">
                    {photos && Array.isArray(photos) && photos.map((photo) => (
                        <div key={photo._id} className="search-photo-card">
                            <PhotoItem photo={photo} />
                            <LikeContainer 
                                photo={photo} 
                                user={user} 
                                handleLike={handleLike} 
                            />
                            <Link className="search-btn-view-more" to={`/photos/${photo._id}`}>
                                Ver Mais
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;