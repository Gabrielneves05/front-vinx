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

const Profile = () => {
  return (
    <div>Profile</div>
  );
};

export default Profile;