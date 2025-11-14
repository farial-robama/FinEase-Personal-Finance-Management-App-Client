import React, { use, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import useTitle from '../../Hooks/useTitle';

const MyProfile = () => {
 useTitle("Profile")

    const { user } = use(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 md:w-96 w-full shadow-sm my-20 mx-auto">
      <figure className="px-10 pt-8">
        <img
          src={user?.photoURL || "/default-profile.png"}
          alt={user?.displayName}
          className="rounded-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[#8061ab]">
          {user?.displayName || "User_Name"}
        </h2>
        <p className="text-[#8061ab] font-semibold pb-3">
          {user?.email || "User_Email"}
        </p>
        <div className="card-actions">
          <button
            onClick={() => navigate("/update-profile")}
            className="btn btn-active bg-linear-to-br from-[#6e82f1] to-[#5923a4] text-white"
          >
            Update Profile
          </button>
          <Link to="/">
            <button className="btn bg-linear-to-br from-[#6e82f1] to-[#5923a4] text-white">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
