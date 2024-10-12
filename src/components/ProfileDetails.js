import React from "react";

const ProfileDetails = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-32 object-cover rounded mb-4"
        />{" "}
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p>{profile.description}</p>
        <p>Location: {profile.location.city},</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
