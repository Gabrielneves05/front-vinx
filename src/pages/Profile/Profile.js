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

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.user);
  const { user: userAuth } = useSelector(state => state.auth);

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

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
    </div>
  );
};

export default Profile;