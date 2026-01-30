import './LikeContainer.css';

import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({ photo, user, handleLike }) => {
    return (
        <div className="like-container">
            {photo.likes && user && (
                <>
                    <button 
                        className={`like-button ${photo.likes.includes(user._id) ? 'liked' : ''}`}
                        onClick={handleLike}
                        aria-label={photo.likes.includes(user._id) ? 'Descurtir' : 'Curtir'}
                    >
                        {photo.likes.includes(user._id) ? (
                            <BsHeartFill className="heart-icon filled" />
                        ) : (
                            <BsHeart className="heart-icon" />
                        )}
                    </button>
                    <p className="like-count">
                        {photo.likes.length} {photo.likes.length === 1 ? 'curtida' : 'curtidas'}
                    </p>
                </>
            )}
        </div>
    )
}

export default LikeContainer;