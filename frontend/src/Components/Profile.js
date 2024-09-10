import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import UploadPics from "./UploadPics";

const Profile = ({ user }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="details">Profile Details</NavLink>
          </li>
          <li>
            <NavLink to="upload">Upload Pics</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<ProfileDetails user={user} />} />
        <Route path="details" element={<ProfileDetails user={user} />} />
        <Route path="upload" element={<UploadPics />} />
      </Routes>
    </div>
  );
};

export default Profile;
