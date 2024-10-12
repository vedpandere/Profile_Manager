import React, { useState } from "react";

const ProfileCard = ({ profile, onSummaryClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="border p-4 rounded-lg mb-4 cursor-pointer shadow hover:shadow-lg transition"
      onClick={toggleDetails}
    >
      <div className="flex items-center">
        <img
          src={profile.image}
          alt={`${profile.name}'s profile`}
          className="w-16 h-16 object-cover rounded-full mr-4"
        />

        <h3 className="text-lg font-bold">{profile.name}</h3>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <p className="font-semibold">{profile.jobProfile}</p>{" "}
          <p>{profile.location.city},</p> <p>{profile.description}</p>{" "}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSummaryClick(profile);
            }}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
          >
            Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
