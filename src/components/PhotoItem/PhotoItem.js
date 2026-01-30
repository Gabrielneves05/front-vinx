import "./PhotoItem.css";

import { uploadUrl } from "../../utils/config";

import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => {
    return (
        <div className="photo-item">
            {photo.image && (
                <div className="photo-image-wrapper">
                    <img src={`${uploadUrl}/photos/${photo.image}`} alt={photo.title} />
                </div>
            )}

            <div className="photo-info">
                <h2>{photo.title}</h2>
                <p className="photo-author">
                    Publicada por: 
                    <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
                </p>
            </div>
        </div>
    )
}

export default PhotoItem;