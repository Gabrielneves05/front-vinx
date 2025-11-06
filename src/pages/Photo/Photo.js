import "./Photo.css";

import { uploadUrl } from "../../utils/config";

// Components
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { photo, loading, error, message } = useSelector(state => state.photo);

    // Comments

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // Like and comment

    if(loading) {
        return (
            <p>Carregando...</p>
        )
    }

    return (
        <div id="photo">
            <PhotoItem photo={photo} />
        </div>
    )
}

export default Photo;