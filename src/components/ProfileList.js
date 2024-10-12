import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import LeafletMap from "./LeafletMap";

const ProfileList = ({ profiles }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      <div className="md:w-1/3 w-full p-6 bg-white shadow-lg overflow-y-auto">
        <input
          type="text"
          placeholder="Search profiles or locations..."
          className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="space-y-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="transition-transform transform hover:scale-105"
            >
              <ProfileCard
                profile={profile}
                onSummaryClick={handleSummaryClick}
                onClick={() => setSelectedProfile(profile)}
              />

              {selectedProfile && selectedProfile.id === profile.id && (
                <div className="mt-4 w-full flex justify-center">
                  <div className="w-full md:hidden h-48 rounded-lg overflow-hidden shadow-md">
                    <LeafletMap
                      latitude={selectedProfile.location.lat}
                      longitude={selectedProfile.location.lng}
                      profileName={selectedProfile.name}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block md:w-2/3 h-full p-6 bg-white shadow-lg">
        {selectedProfile ? (
          <div className="rounded-lg overflow-hidden shadow-md h-full">
            <LeafletMap
              latitude={selectedProfile.location.lat}
              longitude={selectedProfile.location.lng}
              profileName={selectedProfile.name}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a profile to view the map.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
