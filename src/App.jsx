import React, { useState } from "react";
import ProfileList from "./components/ProfileList";
import AdminPanel from "./components/AdminPanel";

// Sample data for profiles
const initialProfiles = [
  {
    id: 1,
    name: "Ved Pandere",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      city: "San Francisco",
    },
    jobProfile: "Software Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image:
      "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Elon Musk",
    location: {
      lat: 34.0522,
      lng: -118.2437,
      city: "Los Angeles",
    },
    jobProfile: "Software Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image:
      "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Tony Stark",
    location: { lat: 40.7128, lng: -74.006, city: "New York" },
    jobProfile: "Software Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image:
      "https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const App = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [currentPage, setCurrentPage] = useState("profileList");

  const handleProfileChange = (updatedProfiles) => {
    setProfiles(updatedProfiles);
  };

  return (
    <div className="h-screen flex flex-col">
      <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <h1 className="text-white text-2xl font-semibold">Profile Manager</h1>
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
              currentPage === "profileList"
                ? "bg-blue-500 text-white shadow"
                : "hover:bg-blue-700 text-white"
            }`}
            onClick={() => setCurrentPage("profileList")}
          >
            Profile List
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
              currentPage === "adminPanel"
                ? "bg-blue-500 text-white shadow"
                : "hover:bg-blue-700 text-white"
            }`}
            onClick={() => setCurrentPage("adminPanel")}
          >
            Admin Panel
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        {currentPage === "profileList" ? (
          <ProfileList profiles={profiles} />
        ) : (
          <AdminPanel
            profiles={profiles}
            onProfileChange={handleProfileChange}
          />
        )}
      </div>
    </div>
  );
};

export default App;
