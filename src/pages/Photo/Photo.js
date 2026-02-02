import "./Photo.css";

import { uploadUrl } from "../../utils/config";

// Components
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

// Icons
import { Send } from "lucide-react";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Photo = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector(state => state.auth);
    const { photo, loading, error, message } = useSelector(state => state.photo);

    // Comments
    const [commentText, setCommentText] = useState("");

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // Insert a like
    const handleLike = () => {
        dispatch(like(photo._id));

        resetMessage();
    }

    // Insert a comment
    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(comment(commentData));

        setCommentText("");

        resetMessage();
    }

    if(loading) {
        return <Loading />;
    }

    return (
        <div className="photo-container">
            <div className="photo-content">
                <div className="photo-header">
                    <h1>Detalhes da Publicação</h1>
                    <p>Veja, curta e comente esta publicação</p>
                </div>

                <div className="photo-main-card">
                    <PhotoItem photo={photo} />
                    <LikeContainer 
                        photo={photo} 
                        user={user} 
                        handleLike={handleLike}
                    />
                </div>

                <div className="message-container">
                    {error && <Message message={error} type="error" />}
                    {message && <Message message={message} type="success" />}
                </div>

                <div className="comments-section">
                    {photo.comments && (
                        <>
                            <div className="comments-header">
                                <h3>Comentários ({photo.comments.length})</h3>
                            </div>

                            <form onSubmit={handleComment} className="comment-form">
                                <div className="comment-input-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder="Insira o seu comentário..." 
                                        onChange={(e) => setCommentText(e.target.value)} 
                                        value={commentText || ""} 
                                    />
                                    <button 
                                        type="submit" 
                                        className="btn-send-comment"
                                        disabled={!commentText.trim()}
                                    >
                                        <Send size={20} />
                                        <span>Enviar</span>
                                    </button>
                                </div>
                            </form>

                            <div className="comments-list">
                                {photo.comments.length === 0 ? (
                                    <p className="no-comments">Não há comentários ainda. Seja o primeiro a comentar!</p>
                                ) : (
                                    photo.comments.map((comment) => (
                                        <div className="comment-item" key={comment.comment}>
                                            <div className="comment-author">
                                                {comment.userImage && (
                                                    <img 
                                                        src={`${uploadUrl}/users/${comment.userImage}`} 
                                                        alt={comment.userName} 
                                                        className="author-avatar"
                                                    />
                                                )}
                                                <Link to={`/users/${comment.userId}`} className="author-name">
                                                    {comment.userName}
                                                </Link>
                                            </div>
                                            <p className="comment-text">{comment.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Photo;