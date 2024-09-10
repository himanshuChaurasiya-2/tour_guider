import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfileDetails = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      address: user?.address || "",
      places: user?.places || "",
      language: user?.language || "",
      profileImage: user?.profileImage || "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("address", user.address || "");
      setValue("places", user.places || "");
      setValue("language", user.language || "");
      setValue("profileImage", user.profileImage || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input type="text" value={user?.name} disabled />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={user?.email} disabled />
      </div>
      <div>
        <label>Mobile</label>
        <input type="text" value={user?.mobile} disabled />
      </div>
      <div>
        <label>Address</label>
        <input {...register("address", { required: true })} />
        {errors.address && <span>This field is required</span>}
      </div>
      <div>
        <label>Places</label>
        <input {...register("places", { required: true })} />
        {errors.places && <span>This field is required</span>}
      </div>
      <div>
        <label>Language</label>
        <input {...register("language", { required: true })} />
        {errors.language && <span>This field is required</span>}
      </div>
      <img src={user?.profileImage} alt="Profile" />
      <button type="submit">Update</button>
    </form>
  );
};

export default ProfileDetails;
