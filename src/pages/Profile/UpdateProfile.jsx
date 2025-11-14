import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import useTitle from '../../Hooks/useTitle';

const UpdateProfile = () => {
  useTitle("Update Profile")

    const { user, setUser, updateUserProfile } = use(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });
      toast.success("Profile updated successfully!!");
      navigate("/my-profile");
    } catch (err) {
      toast.error("Failed to update profile!",err);
    }
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <form onSubmit={handleUpdate}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input w-full mr-20"
              placeholder="Name"
              required
            />
            {/* PhotoURL */}
            <label value={photoURL} className="label">
              PhotoURL
            </label>
            <input
              onChange={(e) => setPhotoURL(e.target.value)}
              type="text"
              className="input w-full mr-20"
              placeholder="Photo URL"
              required
            />

            <button
              type="submit"
              className="btn btn-active bg-linear-to-br from-[#6e82f1] to-[#5923a4] text-white mt-4"
            >
              Update Information
            </button>
            <p className="mt-3">
              Don't want to update?
              <Link
                to="/my-profile"
                className="text-[#8061ab] text-sm font-bold link link-hover pl-2"
              >
                My Profile
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
